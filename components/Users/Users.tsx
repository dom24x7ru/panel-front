import React, { useState, useEffect, useRef } from "react";
import client from "../../storage";
import router from "next/router";
import ConfirmDialogDeleteUser from "./components/ConfirmDialogDeleteUser/ConfirmDialogDeleteUser";
import ConfirmDialogBlockerUser from "./components/ConfirmDialogBlockerUser/ConfirmDialogBlockerUser";
import { DataTable } from "primereact/datatable";
import { Menu } from "primereact/menu";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Tooltip } from 'primereact/tooltip';
import style from "./Users.module.scss";


type TConfirmDialogDeleteUserState = {
  show: any;
  userId?: number;
  onHide: () => void;
  showMessage: () => void;
};

type TConfirmDialogBlockerUserState = {
  show: any;
  userId?: number;
  onHide: () => void;
  showMessage: () => void;
};

const Users = () => {
  const [confirmDialogDeleteUser, setConfirmDialogDeleteUser] = useState<TConfirmDialogDeleteUserState | any >({ show: false });
  const [confirmDialogBlockerUser, setConfirmDialogBlockerUser] = useState<TConfirmDialogBlockerUserState | any >({ show: false });
  const [data, setData] = useState([]);
  const toast = useRef<Toast>(null);
  const tableMenuContextRefs = useRef<any>([]);

  useEffect(() => {
    let params = {};
    client
      .wrapEmit("panel/user.list", params)
      .then((data) => {
        setData(data.users);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const items = (rowData: any) => [
    {
      label: "Изменить",
      icon: "pi pi-file-edit",
      command: () => {
        router.push(`/users/${rowData.id}`);
      },
    },
    {
      label: "Заблокировать",
      icon: "pi pi-ban",
      command: () =>
      onClickConfirmDialog("confirmDialogBlockerUser", {
          userId: rowData.id,
        }),
    },
    {
      label: "Удалить",
      icon: "pi pi-times",
      command: () =>
      onClickConfirmDialog("confirmDialogDeleteUser", {
          userId: rowData.id,
        }),
    },
  ];

  const showMessage = (severity: any, summary: any, detail: any) => {
    toast.current.show({severity: severity, summary: summary, detail: detail, life: 2000});
}

  const onClickConfirmDialog = (name: string, params?: any) => {
    if (name === "confirmDialogDeleteUser") {
      setConfirmDialogDeleteUser({ show: true, userId: params?.userId });
    } else if (name === "confirmDialogBlockerUser") {
      setConfirmDialogBlockerUser({ show: true, userId: params?.userId })
    }
  };

  const onHide = (name: any) => {
    if (name === "confirmDialogDeleteUser") {
      setConfirmDialogDeleteUser({ show: false });
    } else if (name === "confirmDialogBlockerUser") {
      setConfirmDialogBlockerUser({show: false});
    }
  };

  const actionBodyTemplate = (rowData: any) => (
    <React.Fragment>
      <Menu
        model={items(rowData)}
        popup
        ref={(element: any) => {
          tableMenuContextRefs.current[rowData.id ?? 0] = element;
        }}
        id="popup_menu"
      />

      <Button
        icon="pi pi-ellipsis-v"
        className="p-button-rounded p-button-secondary p-button-text"
        aria-controls="popup_menu"
        aria-haspopup
        onClick={(event) => {
          tableMenuContextRefs.current[rowData.id ?? 0].toggle(event);
        }}
      />
    </React.Fragment>
  );

  const stockBodyTemplate = (data: {
    banned: boolean; deleted: boolean; 
}) => ({
    'row-accessories': data.deleted && data.deleted === true || data.banned && data.banned === true,
  });

  const stockBodyOperationsTemplate = (rowData: any) => { 
    if (rowData.deleted && rowData.deleted === true) {
      return(
        <div className='statusOperDraft'>
          <Tooltip target='.pi-user' />
          <i
            className='pi pi-user'
            data-pr-tooltip={'Пользователь удален'}
            data-pr-position='right'
            data-pr-at='right+5 top'
            data-pr-my='left center-2'
            style={{ fontSize: '1.5rem', cursor: 'pointer', color: '#737c8c' }}>
            <i className='pi pi-exclamation-circle' style={{ color: '#910134' }}></i>
          </i>
        </div>
      );
    } else if (rowData.banned && rowData.banned === true) {
      return (
        <div className='statusOperDraft'>
          <Tooltip target='.pi-user' />
          <i
            className='pi pi-user'
            data-pr-tooltip={'Пользователь заблокирован'}
            data-pr-position='right'
            data-pr-at='right+5 top'
            data-pr-my='left center-2'
            style={{ fontSize: '1.5rem', cursor: 'pointer', color: '#737c8c' }}>
            <i className='pi pi-ban' style={{ color: '#910134' }}></i>
          </i>
        </div>
      );
    } else {
      return (rowData.id);
    }
  };


  console.log(data)

  const actionBodyFullName = (rowData: any) =>
    (rowData.person !== null &&
      (rowData.person.name &&
        rowData.person.midname &&
        rowData.person.surname) != undefined) ||
    (rowData.person !== null &&
      (rowData.person.name ||
        rowData.person.midname ||
        rowData.person.surname) != null)
      ? `${rowData.person.name} ${rowData.person.midname} ${rowData.person.surname}`
      : "-";
  const actionBodyAdress = (rowData: any) =>
    rowData.persons || rowData.person.residents[0] != null
      ? rowData.person.residents[0].flat.house.address
      : "-";

  return (
    <>
      <div className="card">
        <Toast ref={toast} />
        <DataTable
          size="small"
          value={data}
          dataKey="id"
          rowClassName={stockBodyTemplate}
          paginator
          rows={10}
          rowsPerPageOptions={[5, 15, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Показано {first} по {last} из {totalRecords} жильцов"
          responsiveLayout="scroll"
        >
          <Column body={stockBodyOperationsTemplate} header="Id Пользователя" />
          <Column body={actionBodyFullName} sortable header="ФИО" />
          <Column
            body={actionBodyAdress}
            header="Адрес"
            sortable
            style={{ maxWidth: "20rem" }}
          />
          <Column
            field="extra.flats"
            header="Номер квартиры"
            style={{ maxWidth: "9rem" }}
          />
          <Column
            field="mobile"
            header="Мобильный"
            style={{ maxWidth: "9rem" }}
          />
          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{
              maxWidth: "3rem",
              wordWrap: "break-word",
              wordBreak: "break-all",
            }}
          />
        </DataTable>
      </div>
      {confirmDialogDeleteUser.show && (
        <ConfirmDialogDeleteUser
          userId={confirmDialogDeleteUser.userId}
          onHide={() => onHide("confirmDialogDeleteUser")}
          showMessage={showMessage}
        />
      )}

      {confirmDialogBlockerUser.show && (
        <ConfirmDialogBlockerUser
          userId={confirmDialogBlockerUser.userId}
          onHide={() => onHide("confirmDialogBlockerUser")}
          showMessage={showMessage}
        />
      )}
    </>
  );
};

export default Users;
