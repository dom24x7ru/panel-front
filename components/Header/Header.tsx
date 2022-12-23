import React, { Children } from 'react';
import { Panel } from 'primereact/panel';

const Header = ({header, className, headerTemplate, ...props} : {
    header?: string,
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