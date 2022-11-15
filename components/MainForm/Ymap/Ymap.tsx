import React, { useEffect } from "react";
import { YMaps, Map, ObjectManager } from "@pbe/react-yandex-maps";

const Ymap = ({ points }: { points: any }) => {
  const [yandexItem, setYandexItems] = React.useState<any>(points);

  useEffect(() => {
    setYandexItems(points);
  }, [points]);

  const collection = {
    type: "FeatureCollection",
    features: yandexItem.houses?.map((item: any, id: any) => {
      if (yandexItem != undefined) {
      return {
        id: id,
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [item.lat, item.lon],
        },
        properties: {
          balloonContent: `
          <div>${item.address}</div>
          Ко-во зарегестрированных: ${item.residents}
        `,
          clusterCaption: `Метка №${id + 1}`,
        },
      };
    }
    })
  };
  //console.log(collection);

  return (
    <>
      <YMaps>
        <Map
          width="100%"
          height="500px"
          defaultState={{
            center: [55.751574, 37.573856],
            zoom: 10,
          }}
        >
          <ObjectManager
            objects={{
              openBalloonOnClick: true,
            }}
            clusters={{}}
            options={{
              clusterize: true,
              gridSize: 32,
            }}
            defaultFeatures={collection}
            modules={[
              "objectManager.addon.objectsBalloon",
              "objectManager.addon.clustersBalloon",
            ]}
          />
        </Map>
      </YMaps>
    </>
  );
};

export default Ymap;
