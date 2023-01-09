import React, { useMemo } from "react";
import router from "next/router";
import { BreadCrumb } from "primereact/breadcrumb";
import style from "./BreadCrumbs.module.scss";

const BreadCrumbs = ({ ...props }) => {
  let url = String(window.location.pathname);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  let crumbs: any[] = []

    const home = {
      icon: "pi pi-home",
      url: "/home/main",
    };

  let items = useMemo(() => {
  if (url === "/home/main") {
    crumbs.push({ label: "Главная"});
  } else if (url === "/houses/homes") {
    crumbs.push({ label: 'Дома'});
  } else if (url === "/users/usersRegistry") {
    crumbs.push({ label: "Пользователи"});
  } else if (url === `/users/${router.query.id}`) {
    crumbs.push(
      {label: 'Пользователи'},
      {label: `Пользователь ${router.query.id}`}
      );
  } else if (url === `/flats/${router.query.id}`) {
    crumbs.push(
      { label: 'Дома'},
      {label: `Список квартир дома ${router.query.id}`}
    );
  }
  return crumbs;
}, [crumbs, url]);

  return (
    <div>
      <div className={style.breadCrumbs}>
        <BreadCrumb className={style.crumbs} model={items} home={home}/>
      </div>
    </div>
  );
};

export default BreadCrumbs;
