import React, { useState, useEffect, useRef } from "react";
import client from "../../storage";
import { DataTable } from "primereact/datatable";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import { Column } from "primereact/column";

const House = () => {
  const [data, setData] = useState([]);

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

  console.log(data);

  return (
    <>
      <div className="card">
        <Toolbar className="mb-4"></Toolbar>
        <DataTable
          value={data}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
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
        </DataTable>
      </div>
    </>
  );
};

export default House;
