import React from 'react';
import moment from "moment";

const OrderBasicGrp = ({ title, data }) => {
    return (
        <div className="orderBasic__grp">
            <p className="orderBasic__grp__title">
                {title}
            </p>
            <p className="orderBasic__grp__data">
                {data}
            </p>
        </div>
    )
}

const OrderBasic = ({ timestampCreated, uuid }) => {
    return (
        <div className="orderBasic">
            <OrderBasicGrp
                key="orderbasicgrp-orderdate"
                title="Order Date"
                data={moment(timestampCreated).format("Do MMMM YYYY, HH:mm:ss")}
            />
            <OrderBasicGrp
                key="orderbasicgrp-orderuuid"
                title="Order Number"
                data={uuid}
            />
        </div>
    )
}

export default OrderBasic;