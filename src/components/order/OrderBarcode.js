import React, { useEffect } from 'react';
import JsBarcode from "jsbarcode";

const OrderBarcode = ({ order: { uuid }}) => {

    useEffect(() => {
        JsBarcode("#orderBarcode__barcode", uuid, {
            lineColor: "#ff33a0",
        })
    })

    return (
        <div id="orderBarcode" className="orderBarcode">
            <img id="orderBarcode__barcode" className="orderBarcode__barcode" alt="orderBarcode" />
        </div>
    )
}

export default OrderBarcode;