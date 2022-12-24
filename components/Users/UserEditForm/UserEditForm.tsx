import * as React from "react";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { InputText } from "primereact/inputtext";
import style from "./UserEditForm.module.scss";
import { Button } from "primereact/button";

const UserEditForm = () => {
  const [form, setForm] = useState<any>();

  console.log(form);

  return (
    <div className={style.container}>
      <div className="card">
        <h2 className={style.header}>Карточка жильца</h2>
        <div className={style.inputDiv}>
          <label htmlFor="lastName">Фамилия</label>
          <InputText
            className={style.input}
            type="text"
            name="lastName"
            value={form?.lastName ?? ""}
            onChange={(evt: any) =>
              setForm({
                ...form,
                lastName: evt.currentTarget.value,
              })
            }
          />
        </div>
        <div className={style.inputDiv}>
          <label htmlFor="firstName">Имя</label>
          <InputText
            className={style.input}
            type="text"
            name="firstName"
            value={form?.firstName ?? ""}
            onChange={(evt: any) =>
              setForm({
                ...form,
                firstName: evt.currentTarget.value,
              })
            }
          />
        </div>
        <div className={style.inputDiv}>
          <label htmlFor="middleName">Отчество</label>
          <InputText
            className={style.input}
            type="text"
            name="middleName"
            value={form?.middleName ?? ""}
            onChange={(evt: any) =>
              setForm({
                ...form,
                middleName: evt.currentTarget.value,
              })
            }
          />
        </div>
        <div className={style.inputDiv}>
          <label htmlFor="address">Адрес</label>
          <InputText
            className={style.input}
            type="text"
            name="address"
            value={form?.address ?? ""}
            onChange={(evt: any) =>
              setForm({
                ...form,
                address: evt.currentTarget.value,
              })
            }
          />
        </div>
        <div className={style.inputDiv}>
          <label htmlFor="mobile">Номер телефона</label>
          <InputText
            className={style.input}
            type="text"
            name="mobile"
            value={form?.mobile ?? ""}
            onChange={(evt: any) =>
              setForm({
                ...form,
                mobile: evt.currentTarget.value,
              })
            }
          />
        </div>
      </div>
      <div className={style.buttonsConfirm}>
          <div className={style.buttons}>
            <Button
              label="Сохранить"
              icon="pi pi-check"
              style={{ width: 164 }}
              className="p-button-submit"
            />
          </div>
          <div className={style.buttons}>
            <Button
              label="Отмена"
              icon="pi pi-times"
              className="p-button-secondary"
            />
          </div>
        </div>
    </div>
  );
};

export default UserEditForm;
