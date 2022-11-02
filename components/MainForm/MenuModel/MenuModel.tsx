import { Menubar } from "primereact/menubar";

const MenuModel = ({
  start,
  end,
  style,
}: {
  start?: any;
  end?: any;
  style?: any;
}) => {
  const items = [
    {
      icon: "pi pi-bell",
     
    },
    {
      icon: "pi pi-user",
      items: [
          {
            label: "Настройки",
            icon: 'pi pi-cog'
          },
          {
            separator:true
          },
          {
            label: 'Выход',
            icon: 'pi pi-fw pi-power-off'
          }
      ],
    },
  ];

  return <Menubar model={items} start={start} end={end} style={style} />;
};

export default MenuModel;
