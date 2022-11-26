import React from 'react';
import { Card } from 'primereact/card';


const CardInform = ({...props}) => {

    return (
        <div>
            <Card title={props.title} subTitle={props.subTitle} style={{ width: '25em' }} footer={props.footer} header={props.header}>
                {props.children}
            </Card>
        </div>
    );
}

export default CardInform;