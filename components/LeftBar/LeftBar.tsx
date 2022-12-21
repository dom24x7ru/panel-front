import { Sidebar } from "primereact/sidebar";

const LeftBar = ({ ...props }) => {
  return (
    <div>
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
  );
};

export default LeftBar;
