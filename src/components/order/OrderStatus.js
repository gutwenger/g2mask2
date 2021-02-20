import React from 'react';

const OrderStatusCard = ({ name, active, next, icon }) => {
    return (
        <>
            <div className={`orderStatusCard ${active ? "orderStatusCard--active" : "orderStatusCard--inactive"}`}>
                <i className={`orderStatusCard__i ${icon}`}></i>
                <p className="orderStatusCard__p">{name}</p>
            </div>
            {next && <i className={`orderStatus__i fas fa-chevron-down ${active ? "orderStatus__i--active" : "orderStatus__i--inactive"}`}></i>}
        </>
    )
}

const OrderStatus = ({ order: { shipping_method, status }}) => {
    console.log(status);

    const processMiddle = shipping_method === "Instore Pick-up"
        ? (
            <OrderStatusCard
                key="orderstatuscard-middle"
                name="Ready for Pick Up"
                icon="fas fa-store-alt"
                active={status==="Ready for Pick Up" || status==="Collected"}
                next={true}
            />
        )
        : (
            <OrderStatusCard
                key="orderstatuscard-middle"
                name="Delivery in Progress"
                icon="fas fa-truck"
                active={status==="Shipped" || status==="Delivered"}
                next={true}
            />
        )

    const processCollect = shipping_method === "Instore Pick-up"
        ? (
            <OrderStatusCard
                key="orderstatuscard-collect"
                name="Item Collected"
                icon="fas fa-hand-holding"
                active={status==="Collected"}
            />
        )
        : (
            <OrderStatusCard
                key="orderstatuscard-collect"
                name="Item Delivered"
                icon="fas fa-truck-loading"
                active={status==="Delivered"}
            />
        )

    return (
        <div id="orderStatus" className="orderStatus">
            <p className="orderStatus__title">
                STATUS
            </p>
            <div className="orderStatus__box">
                <OrderStatusCard
                    key="orderstatuscard-received"
                    name="Received"
                    icon="fas fa-check"
                    active={true}
                    next={true}
                />
                {processMiddle}
                {processCollect}
            </div>
        </div>
    )
}

export default OrderStatus;