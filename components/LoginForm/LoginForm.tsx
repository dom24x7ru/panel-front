import React, { useState, useRef } from "react";
import router from "next/router";
import client from "../../storage";
import { InputMask } from "primereact/inputmask";
import { Toast } from 'primereact/toast';
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import Image from "next/image";
import style from "./FormDemo.module.scss";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import { Controller, useForm } from "react-hook-form";

const LoginForm = () => {
  const [showMessage, setShowMessage] = useState(false);
  const toast = useRef<Toast>(null);
  const [formData, setFormData] = useState({});
  const [status, setStatus] = useState({});
  const defaultValues = {
    mobile: '',
    code: "",
  };
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues });

  const getFormErrorMessage = (name: any) => {
    return (
      errors[name as keyof typeof errors] && <small className="p-error">{errors[name].message}</small>
    );
  };

  const showError = (summary: string, detail: any) => {
    if (toast != null && toast.current != null) {
      toast.current.show({ severity: 'error', summary: summary, detail: detail, life: 10000 });
    }
  };

  const onSubmit = async (data: any) => {
    let params = {
      mobile: `7${data.mobile}`,
      code: data.code
    }
    setShowMessage(true);
    client
      .wrapEmit("user.auth", params)
      .then((data) => {
        setStatus(data);
        data.id ? router.push(`/home/main?id=${data.id}`) : showError('Ошибка', data.message);
      })
      .catch((err: any) => {
        console.log(err)
      });
  };

  return (
    <div className={style.formDemo}>
      <Toast ref={toast}></Toast>
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
          <form className="p-fluid">
            <div className={style.field}>
              <span className="p-float-label">
                <Controller
                  name="mobile"
                  control={control}
                  rules={{ required: "Введите номер телефона" }}
                  render={({ field, fieldState }) => (
                    <InputMask
                      id={field.name}
                        {...field}
                      mask='+7(999)-999-99-99'
                      unmask={true}
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                    />
                  )}
                />
                <label
                  htmlFor="mobile"
                  className={classNames({ "p-error": !!errors.mobile })}
                >
                  Номер телефона
                </label>
              </span>
              {getFormErrorMessage("mobile")}
            </div>
            {status === "OK" || status.message === 'Не совпадает код авторизации' && (
              <div className={style.field}>
                <span className="p-float-label">
                  <Controller
                    name="code"
                    control={control}
                    rules={{ required: "Введите код" }}
                    render={({ field, fieldState }) => (
                      <InputMask
                        id={field.name}
                        {...field}
                        mask="9999"
                        unmask={true}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                      />
                    )}
                  />
                  <label
                    htmlFor="code"
                    className={classNames({ "p-error": !!errors.code })}
                  >
                    Код
                  </label>
                </span>
                {getFormErrorMessage("code")}
              </div>
            )}
            <Button
              onClick={handleSubmit(onSubmit)}
              label="Вход"
              style={{ background: "#25476a", border: "none" }}
              className="mt-2"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
