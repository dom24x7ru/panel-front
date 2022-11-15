import _ from "lodash";
const EventEmitter = require('events');
const socketClusterClient = require('socketcluster-client');

export default class SocketClient extends EventEmitter {

  constructor(options) {
    super();

    this.user = null;
    this.data = {};
    this.ready = false;
    this.socket = socketClusterClient.create(options);

    this.socket.on("connect", status => {
      console.log("isAuthenticated", status.isAuthenticated);
      this.handleConnect()
    });
    this.socket.on("authenticate", () => {
      this.handleLogin()
    });
  }

  async handleConnect() {
    this.ready = false;
    this.emit("loading");
    // for (let name of this.commonChannels()) this.initChannel(name);
    if (!this.user) await this.handleLogin();
  }

  async handleLogin() {
    this.ready = false;
    this.emit("loading");
    if (this.socket.authToken) {
      let {
        id,
        mobile,
        banned,
        role
      } = this.socket.authToken;
      let user = this.user = {
        id,
        mobile,
        banned,
        role,
        person: null,
        resident: null
      };
      for (let name of this.userChannels()) this.initChannel(name);
      this.emit("login", {
        user
      });
    } else {
      // this.handleLogout()
      this.emit("ready");
    }
  }

  // handleLogout() {
  //   this.closeUserChannels();
  //   this.emit("logout");
  //   this.user = null;
  // }

  // handleRefresh() {
  //   this.ready = false;
  //   this.emit("loading");
  //   this.closeUserChannels();
  //   this.user = null;
  // }

  wrapEmit(event, params) {
    return new Promise(resolve => {
      this.socket.emit(event, params, (error, response) => {
        if (error) {
          error.methodName = event
          console.log("ERROR", event, error);
        }
        error ? resolve({
          status: "ERROR",
          message: error.message
        }) : resolve(response);
      });
    });
  }

};