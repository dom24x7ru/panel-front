import client from "../../../../storage/index";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import style from "./ConfirmDialogBlockerUser.module.scss";

const ConfirmDialogBlockerUser = ({
  onHide,
  userId,
  showMessage,
}: {
  onHide: () => void;
  userId: any;
  showMessage: (severity: any, summary: any, detail: any) => void;
}) => {
  const blockUser = () => {
    client
      .wrapEmit("panel/user.block", { userId })
      .then((response) => {
        showMessage(
          "success",
          "Пользователь заблокирован",
          response.message
        );
      })
      .catch((error) => {
        console.log(error);
      });
      onHide();
  };

  return (
    <>
      <Dialog
        header="Вы действительно хотите заблокировать пользователя?"
        onHide={onHide}
        visible={true}
        className={style.dialog}
      >
        <div className={style.buttonsConfirm}>
          <div className={style.buttons}>
            <Button
              label="Заблокировать"
              icon="pi pi-check"
              style={{ width: 185 }}
              className="p-button-danger"
              onClick={blockUser}
            />
          </div>
          <div className={style.buttons}>
            <Button
              label="Отмена"
              icon="pi pi-times"
              className="p-button-secondary"
              onClick={onHide}
            />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ConfirmDialogBlockerUser;
