import React, { useEffect } from "react";
import { YMaps, Map, ObjectManager } from "@pbe/react-yandex-maps";

const Ymap = ({ points }: { points: any }) => {
  const [yandexItem, setYandexItems] = React.useState<any>([]);
  const [state, setState] = React.useState(points);

  useEffect(() => {
    setState(points)
    let pointsArr: { id: any; geometry: { type: string; coordinates: any[]; }; properties: { balloonContent: string; clusterCaption: string; }; }[] = [];
    (state.houses ?? []).map((item: any) => {
      pointsArr.push({
        id: item.id,
        geometry: {
          type: "Point",
          coordinates: [item.lat, item.lon],
        },
        properties: {
          balloonContent: `
                  <div>${item.address}</div>
                  Ко-во зарегистрированных: ${item.residents}
                `,
          clusterCaption: `Метка №${item.id + 1}`,
        },
      });
    });
    setYandexItems(pointsArr)
  }, [points, points.houses, state.houses]);

  return (
    <>
      <YMaps>
        <Map
          width="100%"
          height="500px"
          state={{
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
            features={{ type: "FeatureCollection", features: yandexItem }}
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
