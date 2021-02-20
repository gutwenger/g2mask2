import React from 'react';

import OrderItemCard from "./OrderItemCard";

const OrderItems = ({ order: { items } }) => {
    return (
        <div id="orderItems" className="orderItems">
            {items.map((item, i) => (
                <OrderItemCard
                    key={`orderitemcard-${i}`}
                    item={item}
                />
            ))}
        </div>
    )
}

export default OrderItems;