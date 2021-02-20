import React from 'react'

const OrderItemCardPricebox = ({ title, data, gridArea }) => {
    return (
        <div className={`orderItemCard__pricebox orderItemCard__${gridArea}`}>
            <p className="orderItemCard__pricebox__title">
                {title}
            </p>
            <p className="orderItemCard__pricebox__unit">
                {data}
            </p>
        </div>
    )
}

export default OrderItemCardPricebox;