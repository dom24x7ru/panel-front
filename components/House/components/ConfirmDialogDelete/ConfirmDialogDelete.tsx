import client from '../../../../storage/index';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import style from './ConfirmDialogDelete.module.scss';


const ConfirmDialogDelete = ({onHide, houseId}: {
    onHide: any;
    houseId: number;
}) => {
    const deleteHouse = () => {
        client.wrapEmit('panel/house.delete', {houseId}).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error);
        });
        onHide();
    }
    
    return (
        <>
      <Dialog
        header="Вы действительно хотите удалить информацию?"
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
              onClick={deleteHouse}
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

export default ConfirmDialogDelete;