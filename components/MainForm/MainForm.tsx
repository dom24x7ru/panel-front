import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { OverlayPanel } from "primereact/overlaypanel";
import { BreadCrumb } from "primereact/breadcrumb";
import { Accordion, AccordionTab } from "primereact/accordion";
import SocketClient from "../../api/SocketClient";
import Header from "../Header/Header";
import LeftBar from "../LeftBar/LeftBar";
import style from "./MainForm.module.scss";
import Ymap from "./Ymap/Ymap";

const MainForm = () => {
  const [visibleLeft, setVisibleLeft] = useState(false);
  const [points, setPoints] = useState<any>([]);
  const overlayNotification = useRef<OverlayPanel>(null);
  const overlayUser = useRef<OverlayPanel>(null);

  const itemsCrumbs = [
    { label: "Computer" },
    { label: "Notebook" },
    { label: "Accessories" },
  ];

  useEffect(() => {
    let client = new SocketClient({
      port: 443,
      hostname: "node.dom24x7.ru",
      secure: true,
    });
    let params = {};
    client
      .wrapEmit("panel/house.list", params)
      .then((data) => {
        setPoints(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const headerCostom = (options: any) => {
    return (
      <div className={style.header}>
        <div className={style.start}>
          <Button
            icon="pi pi-bars"
            onClick={() => setVisibleLeft(true)}
            className="p-button-rounded p-button-secondary p-button-text"
            style={{ color: "white", marginTop: "0.4em" }}
          />
        </div>
        <h3>DOM 24x7</h3>
        <div className={style.end}>
          <div className={style.breadCrumbs}>
            <BreadCrumb model={itemsCrumbs} />
          </div>
          <Button
            type="button"
            icon="pi pi-bell"
            style={{ color: "white" }}
            className="p-button-rounded p-button-secondary p-button-text"
            onClick={(e) => overlayNotification.current.toggle(e)}
          />
          <Button
            type="button"
            icon="pi pi-user"
            style={{ color: "white" }}
            className="p-button-rounded p-button-secondary p-button-text"
            onClick={(e) => overlayUser.current.toggle(e)}
          />
          <OverlayPanel ref={overlayNotification}>
            <h3>Уведомления</h3>
          </OverlayPanel>
          <OverlayPanel ref={overlayUser}>
            <Button
              label="Настройки"
              className="p-button-secondary p-button-text"
            />
            <Button
              label="Выход"
              className="p-button-secondary p-button-text"
            />
          </OverlayPanel>
        </div>
      </div>
    );
  };

  return (
    <div className={style.content}>
      <div className={style.div1}>
        <LeftBar
          className={style.leftBar}
          visible={visibleLeft}
          onHide={() => setVisibleLeft(false)}
        >
          <div className={style.avatar}>
            <Avatar
              image="images/avatar/amyelsner.png"
              className="mr-2"
              size="xlarge"
              shape="circle"
            />
            <Accordion activeIndex={1}>
              <AccordionTab
                tabIndex={1}
                className="accordionUserEdit"
                header={
                  <React.Fragment>
                    <i className="pi pi-user-edit"></i>
                    <span>Тимур Евгажуков (Администратор)</span>
                  </React.Fragment>
                }
              >
                <p>Профиль</p>
              </AccordionTab>
            </Accordion>
          </div>
          <Accordion style={{ marginTop: "38px" }} activeIndex={0}>
            <AccordionTab
              tabIndex={1}
              header={
                <React.Fragment>
                  <i className="pi pi-home"></i>
                  <span>Дома</span>
                </React.Fragment>
              }
            >
              <p>Дома</p>
            </AccordionTab>
            <AccordionTab
              tabIndex={2}
              header={
                <React.Fragment>
                  <i className="pi pi-wrench"></i>
                  <span>Настройки</span>
                </React.Fragment>
              }
            >
              <p>Настройки</p>
            </AccordionTab>
            <AccordionTab
              tabIndex={3}
              header={
                <React.Fragment>
                  <i className="pi pi-user"></i>
                  <span>Пользователи</span>
                </React.Fragment>
              }
            >
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              </p>
            </AccordionTab>
          </Accordion>
        </LeftBar>
      </div>
      <div className={style.div2}>
        <Header header={"DOM 24x7"} headerTemplate={headerCostom}>
          <Ymap points={points} />
        </Header>
      </div>
    </div>
  );
};

export default MainForm;
