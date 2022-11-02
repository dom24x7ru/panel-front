import React from 'react';
import { BreadCrumb } from 'primereact/breadcrumb';



const BreadCrumbs = ({className, ...props}) => {
    const items = [
        {label: 'Главная'},
        {label: 'Пользователи'},
        {label: 'Дома'},
    ];

    const home = { icon: 'pi pi-home', url: 'https://www.primefaces.org/primereact/showcase' }

    return (
        <div>
            <div className="card">
                <BreadCrumb className={className} model={items} home={home} />
            </div>
        </div>
    );
}