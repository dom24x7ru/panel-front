import React, { useState, useEffect, useRef } from "react";
import client from "../../storage";
import { DataTable } from "primereact/datatable";
import { Menu } from "primereact/menu";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import style from './Houses.module.scss';

const House = () => {
  const [data, setData] = useState([]);
  const tableMenuContextRefs = useRef<any>([]);

  useEffect(() => {
    let params = {};
    client
      .wrapEmit("panel/house.list", params)
      .then((data) => {
        setData(data.houses);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const items = (rowData: any) => [
    {
      label: 'Изменить',
      icon: "pi pi-refresh",
    },
    {
      label: 'Удалить',
      icon: "pi pi-times",
    },
  ];

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="Добавить"
          icon="pi pi-plus"
          className="p-button-secondary p-button-text"
        />
      </React.Fragment>
    );
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

  return (
    <>
      <div className="card">
        <Toolbar className={style.toolbar} right={rightToolbarTemplate}/>
        <DataTable
          value={data}
          dataKey="id"
          paginator
          rows={15}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Показано {first} по {last} из {totalRecords} дома"
          responsiveLayout="scroll"
        >
          <Column
            field="id"
            header="Id Дома"
            sortable
            style={{ minWidth: "12rem" }}
          />
          <Column
            field="address"
            header="Адрес"
            sortable
            style={{ minWidth: "16rem" }}
          />
          <Column field="image" header="Геоданные" />
          <Column
            field="extra.flats"
            header="Кол-во квартир"
            sortable
            style={{ minWidth: "8rem" }}
          />
          <Column
            field="residents"
            header="Кол-во зарегистрированных"
            sortable
            style={{ minWidth: "10rem" }}
          />
          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{
              maxWidth: "5rem",
              wordWrap: "break-word",
              wordBreak: "break-all",
            }}
          />
        </DataTable>
      </div>
    </>
  );
};

export default House;
