import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { AddressSuggestions } from "react-dadata";
import { Button } from "primereact/button";
import { Col, Row } from "react-bootstrap";
import style from "./ConfirmDialogEdit.module.scss";
import client from '../../../../storage/index';
import "react-dadata/dist/react-dadata.css";


const ConfirmDialogEdit = ({
  onHide,
  houseId,
}:{
  onHide: any;
  houseId: number;
}) => {
  const [form, setForm] = useState<any>();

  const acceptEditAddress = () => {
    client.wrapEmit("panel/house.save", {houseId, address: form}).then((response) => {
      console.log(response)
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <>
      <Dialog
        header="Изменение информации по дому"
        onHide={onHide}
        visible={true}
        className={style.dialog}
      >
        <Row>
          <Col>
            <h4 className={style.header}>Изменить адрес</h4>
            <AddressSuggestions
              token="cea9e9da956d849683f0e6f636fa32fe232bded7"
              value={form}
              onChange={setForm}
            />
          </Col>
        </Row>

        <div className={style.buttonsConfirm}>
          <div className={style.buttons}>
            <Button
              label="Изменить"
              icon="pi pi-check"
              style={{ width: 164 }}
              className="p-button-danger"
              onClick={acceptEditAddress}
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

export default ConfirmDialogEdit;
