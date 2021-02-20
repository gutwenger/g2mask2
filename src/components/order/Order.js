import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import validateUUID from "uuid-validate";

import { useAuth } from "../../context/AuthContext";
import { useMessage } from "../../context/MessageContext";

import { getOrder } from "../../util/getOrder";
import LoadingLarge from "../loading/LoadingLarge";
import OrderAddresses from './OrderAddresses';
import OrderBarcode from './OrderBarcode';
import OrderBasic from './OrderBasic';
import OrderItems from './OrderItems';
import OrderStatus from './OrderStatus';
import OrderTotal from './OrderTotal';

const Order = (props) => {

    const history = useHistory();

    const { user } = useAuth();
    const { displayMessage } = useMessage()

    const [error, setError] = useState("");
    const [order, setOrder] = useState(()=>checkOrder());

    useEffect(() => {
        return () => {
            setError("");
            setOrder(false);
        }
    }, [])

    function checkOrder() {
        
        // GET OrderId
        const { orderID } = props.match.params;
        
        // Validate orderID
        if (!validateUUID(orderID, 4)) {
            setError("Invalid order number.");
            return "Invalid order number";
        } 

        getOrder({ uuid: orderID, user }).then(result => {
            if (result.detail) {
                setOrder(result);
                setError(result.detail);
                displayMessage({ type: "Error", content: "You must login to view this order." })
                history.push("/login");
                return;
            }
            setOrder(result);
        });

        return false;
    }

    const content = (
        <div id="order" className="order">
            <h1 className="order__h1">ORDER</h1>
            <OrderBasic
                key="orderbasic"
                timestampCreated={order && order.timestamp_created}
                uuid={order && order.uuid}
            />
            <OrderItems
                key="orderitems"
                order={order}
            />
            <OrderTotal
                key="ordertotal"
                order={order}
            />
            <OrderAddresses
                key="orderaddresses"
                order={order}
            />
            <OrderStatus
                key="orderstatus"
                order={order}
            />
            <OrderBarcode
                key="orderbarcode"
                order={order}
            />
        </div>
    )

    const errorContent = (
        <div id="orderError" className="orderError">
            <h1 className="orderError__h1">Opps</h1>
            <i className="orderError__i fas fa-exclamation-triangle"></i>
            <p className="orderError__p">{error}</p>
        </div>
    )

    return order 
        ? error
            ? errorContent
            : content
        : <LoadingLarge />;
}

export default Order;