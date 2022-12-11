import React, { useState, useEffect, useRef } from "react";
import client from "../../storage";
import { DataTable } from "primereact/datatable";
import { Menu } from "primereact/menu";
import { Column } from "primereact/column";
import style from "./Users.module.scss";
import { Button } from "primereact/button";

const Users = () => {
  const [data, setData] = useState([]);
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

  console.log(data);

  const items = (rowData: any) => [
    {
      label: "Изменить",
      icon: "pi pi-refresh",
    },
    {
      label: "Удалить",
      icon: "pi pi-times",
    },
  ];

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

  const actionBodyFullName = (rowData: any) =>
    (rowData.person !== null && (rowData.person.name && rowData.person.midname && rowData.person.surname) !=
      undefined ||
      rowData.person !== null && (rowData.person.name || rowData.person.midname || rowData.person.surname) !=
      null)
      ? `${rowData.person.name} ${rowData.person.midname} ${rowData.person.surname}`
      : "-";
  const actionBodyAdress = (rowData: any) =>
    rowData.persons || rowData.person.residents[0] != null
      ? rowData.person.residents[0].flat.house.address
      : "-";

  return (
    <>
      <div className="card">
        <DataTable
          value={data}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 15, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Показано {first} по {last} из {totalRecords} дома"
          responsiveLayout="scroll"
        >
          <Column field="id" header="Id Пользователя" />
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
            sortable
            style={{ maxWidth: "9rem" }}
          />
          <Column
            field="mobile"
            header="Мобильный"
            sortable
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
    </>
  );
};

export default Users;
