import client from "../../../../storage/index";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import style from "./ConfirmDialogDeleteUser.module.scss";

const ConfirmDialogDeleteUser = ({
  onHide,
  userId,
  showMessage,
} : {
  onHide: () => void;
  userId: any;
  showMessage: (severity: any, summary: any, detail: any) => void;
}) => {
  const deleteUser = () => {
    let params = {id: userId}
    client
      .wrapEmit("panel/user.del", params)
      .then((response) => {
        showMessage('success', 'Пользователь удален',  response.message);
      })
      .catch((error) => {
        showMessage('danger', 'Ошибка',  error.message);
      });
      onHide();
  };
  
  return (
    <>
      <Dialog
        header="Вы действительно хотите удалить пользователя?"
        onHide={onHide}
        visible={true}
        className={style.dialog}
      >
        <div className={style.buttonsConfirm}>
          <div className={style.buttons}>
            <Button
              label="Удалить"
              icon="pi pi-check"
              style={{ width: 164 }}
              className="p-button-danger"
              onClick={deleteUser}
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

export default ConfirmDialogDeleteUser;
