import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Menu } from "primereact/menu";
import { Toolbar } from "primereact/toolbar";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import client from "../../../../storage";

const FlatRegistry = () => {
  const [data, setData] = useState([]);
  const tableMenuContextRefs = useRef<any>([]);

  const items = (rowData: any) => [
    {
      label: "Изменить",
      icon: "pi pi-file-edit",
    },
    {
      label: "Удалить",
      icon: "pi pi-times",
    },
  ];

  useEffect(() => {
    let params = { houseId: window.location.search.split("=")[1] };
    client
      .wrapEmit("panel/flat.list", params)
      .then((data) => {
        setData(data.flats);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
        <DataTable
          value={data}
          dataKey="id"
          size="small"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 15, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Показано {first} по {last} из {totalRecords} квартир"
          responsiveLayout="scroll"
        >
          <Column field="id" header="Id Квартиры" />
          <Column
            field="number"
            header="Номер"
            sortable
            style={{ maxWidth: "20rem" }}
          />
          <Column
            field="section"
            header="Секция"
            sortable
            style={{ maxWidth: "20rem" }}
          />
          <Column field="floor" header="Этаж" style={{ maxWidth: "9rem" }} />
          <Column
            field="rooms"
            header="Количество комнат"
            style={{ maxWidth: "9rem" }}
          />
          <Column
            field="square"
            header="Площадь"
            style={{ maxWidth: "9rem" }}
          />
          <Column
            field="residents"
            header="Количество проживающих"
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

export default FlatRegistry;
