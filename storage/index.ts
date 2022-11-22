import SocketClient from "./../api/SocketClient";

let client = new SocketClient({
    port: 443,
    hostname: "node.dom24x7.ru",
    secure: true,
  });

  export default client;