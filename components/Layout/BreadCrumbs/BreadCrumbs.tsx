import React from 'react';
import { BreadCrumb } from 'primereact/breadcrumb';



const BreadCrumbs = ({...props}) => {

    const home = { icon: 'pi pi-home', url: 'https://www.primefaces.org/primereact/showcase' }

    return (
        <div>
            <div className="card">
                <BreadCrumb className={props.className} model={props.model} home={props.home} />
            </div>
        </div>
    );
};

export default BreadCrumbs;