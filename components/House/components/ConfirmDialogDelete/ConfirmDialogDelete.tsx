import { ConfirmDialog } from 'primereact/confirmdialog';

const ConfirmDialogDelete = ({onHide, houseId}: {
    onHide: any;
    houseId: number;
}) => {
    return (
        <div>
        <ConfirmDialog visible={true} onHide={onHide} message="Вы уверены, что хотите удалить информацию по этому дому?"
        header="Предупреждение" icon="pi pi-exclamation-triangle"  />
    </div>
    );
};

export default ConfirmDialogDelete;