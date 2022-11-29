import React from 'react';
import { BreadCrumb } from 'primereact/breadcrumb';
import style from './BreadCrumbs.module.scss';



const BreadCrumbs = ({...props}) => {

    const home = { icon: 'pi pi-home', url: 'https://www.primefaces.org/primereact/showcase' }

    return (
        <div>
            <div className={style.breadCrumbs}>
                <BreadCrumb className={style.crumbs} model={props.model} home={props.home} />
            </div>
        </div>
    );
};

export default BreadCrumbs;