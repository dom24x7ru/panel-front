import React, { useEffect, useState } from "react";
import client from "../../storage";
import Header from "../Header/Header";
import style from "./MainForm.module.scss";
import Ymap from "./Ymap/Ymap";

const MainForm = () => {
  const [points, setPoints] = useState<any>([]);


  useEffect(() => {
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

      return (
        <div>
      <div className={style.div2}>
        <Header>
          <Ymap points={points} />
        </Header>
      </div>
    </div>
  );
};

export default MainForm;
