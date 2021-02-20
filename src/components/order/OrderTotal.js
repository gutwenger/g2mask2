import React from 'react'

const OrderTotalGrp = ({ title, data, otherData, gridArea }) => {

    const otherDataDisplay = otherData && (
        <span className="orderTotal__grp__title__span">
            ({otherData})
        </span>
    );

    return (
        <div className={`orderTotal__grp orderTotal__grp--${gridArea}`}>
            <p className="orderTotal__grp__title">
                {title}
                <br></br>
                <span className="orderTotal__grp__title__span">{otherDataDisplay}</span>
            </p>
            <p className="orderTotal__grp__data">
                {data}
            </p>
        </div>
    )
}

const OrderTotal = ({ order: { shipping_method, shipping_price, subtotal } }) => {
    return (
        <div id="orderTotal" className="orderTotal">
            <div className="orderTotal__box">
                <OrderTotalGrp
                    key="ordertotalgrp-subtotal"
                    title="SUBTOTAL"
                    gridArea="subtotal"
                    data={subtotal}
                    otherData=""
                />
                <OrderTotalGrp
                    key="ordertotalgrp-shipping"
                    title="SHIPPING"
                    gridArea="shipping"
                    data={shipping_price}
                    otherData={shipping_method}
                />
                <OrderTotalGrp
                    key="ordertotalgrp-total"
                    title="TOTAL"
                    gridArea="total"
                    data={(Number(shipping_price) + Number(subtotal)).toFixed(1)}
                />
            </div>
        </div>
    )
}

export default OrderTotal;