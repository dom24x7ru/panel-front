import React, { Children } from 'react';
import { Panel } from 'primereact/panel';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';


const Header = ({header, className, headerTemplate, ...props} : {
    header: string,
    children?: React.ReactNode,
    className?: string,
    headerTemplate?: any
}) => {
    return (
        <div>
            <Panel className={className} header={header} headerTemplate={headerTemplate}>
                {props.children}
            </Panel>
        </div>
    );
};

export default Header;