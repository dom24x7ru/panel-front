import * as React from "react";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { InputText } from "primereact/inputtext";
import style from "./UserEditForm.module.scss";

const UserEditForm = () => {
  const [form, setForm] = useState<any>();

  return (
    <div className={style.container}>
      <div className="card">
        <h2 className={style.header}>Карточка жильца</h2>
        <div className={style.inputDiv}>
          <label htmlFor="username1" className="block">
            Фамилия
          </label>
          <InputText className={style.input} value={[]} />
        </div>
        <div className={style.inputDiv}>
          <label htmlFor="username1" className="block">
            Имя
          </label>
          <InputText className={style.input} value={[]} />
        </div>
        <div className={style.inputDiv}>
          <label htmlFor="username1" className="block">
            Отчество
          </label>
          <InputText className={style.input} value={[]} />
        </div>
        <div className={style.inputDiv}>
          <label htmlFor="username1" className="block">
            Номер телефона
          </label>
          <InputText className={style.input} value={[]} />
        </div>
        <div className={style.inputDiv}>
          <label htmlFor="username1" className="block">
            Полный адрес
          </label>
          <InputText className={style.input} value={[]} />
        </div>
        <div className={style.inputDiv}>
          <label htmlFor="username1" className="block">
            Квартира
          </label>
          <InputText className={style.input} value={[]} />
        </div>
      </div>
    </div>
  );
};

export default UserEditForm;
