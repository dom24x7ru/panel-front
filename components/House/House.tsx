import React, { useState, useEffect, useRef } from "react";
import client from "../../storage";
import ConfirmDialogDelete from "./components/ConfirmDialogDelete/ConfirmDialogDelete";
import ConfirmDialogEdit from "./components/ConfirmDialogEdit/ConfirmDialogEdit";
import { DataTable } from "primereact/datatable";
import { Menu } from "primereact/menu";
import { Toolbar } from "primereact/toolbar";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import style from "./Houses.module.scss";
import router from "next/router";



type TConfirmDialogDeleteState = {
  show: any;
  houseId?: any;
  onHide: () => void;
};

type TConfirmDialogEditState = {
  show: any;
  houseId?: any;
  onHide: () => void;
};

const House = () => {
  const [confirmDialogDelete, setConfirmDialogDelete] = useState<TConfirmDialogDeleteState | any >({ show: false });
  const [confirmDialogEdit, setConfirmDialogEdit] = useState<TConfirmDialogEditState | any  >({ show: false });
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
      label: "Список квартир",
      icon: "pi pi-home",
      command: () => router.push(`/flats/flatsRegistry?houseId=${rowData.id}`)
    },
    {
      label: "Изменить",
      icon: "pi pi-refresh",
      command: () =>
        onClickConfirmDialogDelete("confirmDialogEdit", {
          houseId: rowData.id,
        }),
    },
    {
      label: "Удалить",
      icon: "pi pi-times",
      command: () =>
        onClickConfirmDialogDelete("confirmDialogDelete", {
          houseId: rowData.id,
        }),
    },
  ];

  const onClickConfirmDialogDelete = (name: string, params?: any) => {
    if (name === "confirmDialogDelete") {
      setConfirmDialogDelete({ show: true, houseId: params?.houseId });
    } else if (name === "confirmDialogEdit") {
      setConfirmDialogEdit({ show: true, houseId: params?.houseId });
    }
  };

  const onHide = (name: any) => {
    if (name === "confirmDialogDelete") {
      setConfirmDialogDelete({ show: false });
    } else if (name === "confirmDialogEdit") {
      setConfirmDialogEdit({ show: false });
    }
  };

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

  const geoBodyTemplate = (rowData: any) => {
    if (rowData && rowData.lat && rowData.lon) {
      return (
        <div>
          <div>Ш: {rowData.lat}</div>
          <div>Д: {rowData.lon}</div>
        </div>
      );
    }
    return "-";
  };

  return (
    <>
      <div className="card">
        <Toolbar className={style.toolbar} right={rightToolbarTemplate} />
        <DataTable
          value={data}
          dataKey="id"
          size="small"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 15, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Показано {first} по {last} из {totalRecords} дома"
          responsiveLayout="scroll"
        >
          <Column field="id" header="Id Дома" />
          <Column
            field="address"
            header="Адрес"
            sortable
            style={{ maxWidth: "20rem" }}
          />
          <Column body={geoBodyTemplate} header="Геоданные" />
          <Column
            field="extra.flats"
            header="Кол-во квартир"
            sortable
            style={{ maxWidth: "9rem" }}
          />
          <Column
            field="residents"
            header="Кол-во зарегистрированных"
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

      {confirmDialogDelete.show && (
        <ConfirmDialogDelete
          houseId={confirmDialogDelete.houseId}
          onHide={() => onHide("confirmDialogDelete")}
        />
      )}

      {confirmDialogEdit.show && (
        <ConfirmDialogEdit
          houseId={confirmDialogEdit.houseId}
          onHide={() => onHide("confirmDialogEdit")}
        />
      )}
    </>
  );
};

export default House;
