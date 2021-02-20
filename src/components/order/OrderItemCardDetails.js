import React from 'react'

const OrderItemCardDetails = ({ name, brand, size }) => {
    return (
        <div className="orderItemCard__details">
            <p className="orderItemCard__details__name">
                {name}
            </p>
            <p className="orderItemCard__details__brand">
                {brand}
            </p>
            <p className="orderItemCard__details__size">
                Size: <span className="orderItemCard__details__size__span">{size}</span>
            </p>
        </div>
    )
}

export default OrderItemCardDetails;