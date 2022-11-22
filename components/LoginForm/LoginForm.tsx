import React, { useState } from "react";
import router from 'next/router';
import client from "../../storage";
import { Form, Field } from "react-final-form";
import { InputMask } from "primereact/inputmask";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import Image from "next/image";
import style from "./FormDemo.module.scss";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";

const LoginForm = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});

  const validate = (data: { mobile: string; code: string }) => {
    let errors = {};

    if (!data.mobile) {
      errors.mobile = "Номер телефона обязателен для заполнения";
    }
    // if (!data.code) {
    //   errors.code = "Введите код из смс.";
    // }

    return errors;
  };

  const onSubmit = (data: React.SetStateAction<{}>) => {
    setFormData(data);
    setShowMessage(true);
    client
      .wrapEmit("user.auth", formData)
      .then((data) => {
        console.log(data);
        data.id ? router.push('/home/main') : null;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(formData);

  const isFormFieldValid = (meta: any) => !!(meta.touched && meta.error);
  const getFormErrorMessage = (meta: {
    error: string | number | boolean | null | undefined;
  }) => {
    return (
      isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>
    );
  };

  return (
    <div className={style.formDemo}>
      <div className="flex justify-content-center">
        <div className={style.card}>
          <Image
            className={style.logo}
            src="/building.svg"
            alt="Logo"
            width={200}
            height={80}
          />
          <h2 className="text-center">DOM 24x7 Панель администратора</h2>
          <h4 className="text-center">Авторизация пользователя</h4>
          <Form
            onSubmit={onSubmit}
            initialValues={{
              mobile: "",
              code: "",
            }}
            validate={validate}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className="p-fluid">
                <Field
                  name="mobile"
                  render={({ input, meta }) => (
                    <div className={style.field}>
                      <span className="p-float-label">
                        <InputMask
                          id="mobile"
                          {...input}
                          mask="+9(999)-999-99-99"
                          unmask={true}
                          className={classNames({
                            "p-invalid": isFormFieldValid(meta),
                          })}
                        />
                        <label
                          htmlFor="mobile"
                          className={classNames({
                            "p-error": isFormFieldValid(meta),
                          })}
                        >
                          Номер телефона*
                        </label>
                      </span>
                      {getFormErrorMessage(meta)}
                    </div>
                  )}
                />

                <Field
                  name="code"
                  render={({ input, meta }) => (
                    <div className={style.field}>
                      <span className="p-float-label">
                        <InputMask
                          id="code"
                          {...input}
                          mask="9999"
                          slotChar="____"
                          className={classNames({
                            "p-invalid": isFormFieldValid(meta),
                          })}
                        />
                        <label
                          htmlFor="code"
                          className={classNames({
                            "p-error": isFormFieldValid(meta),
                          })}
                        >
                          Код*
                        </label>
                      </span>
                      {getFormErrorMessage(meta)}
                    </div>
                  )}
                />
                <Button
                  type="submit"
                  label="Вход"
                  style={{ background: "#25476a", border: "none" }}
                  className="mt-2"
                />
              </form>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
