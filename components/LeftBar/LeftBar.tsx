import { Sidebar } from "primereact/sidebar";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";

const LeftBar = ({ ...props }) => {
  return (
    <div>
      <div className="card">
        <Sidebar
          visible={props.visible}
          modal={props.modal}
          onShow={props.onShow}
          onHide={props.onHide}
          showCloseIcon={props.showCloseIcon}
        >
          {props.children}
        </Sidebar>
      </div>
    </div>
  );
};

export default LeftBar;
