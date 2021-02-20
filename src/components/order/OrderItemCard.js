import React from 'react'
import OrderItemCardDetails from './OrderItemCardDetails'
import OrderItemCardPricebox from './OrderItemCardPricebox'

const OrderItemCard = ({ 
    item: { 
        item: { 
            mask: { 
                name, brand, img
            },
            size
        }, 
        quantity, price_original, price_subtotal 
    }}) => {
    return (
        <div className="orderItemCard">
            <div className="orderItemCard__img">
                <img className="orderItemCard__img__img" src={img} alt="item_photo" />
            </div>
            <OrderItemCardDetails
                key="orderitemcard-details"
                name={name}
                brand={brand.name}
                size={size}
            />
            <OrderItemCardPricebox
                key="orderitemcard-quantity"
                title="QUANTITY"
                gridArea="quantity"
                data={quantity}

            />
            <OrderItemCardPricebox
                key="orderitemcard-unit"
                title="UNIT"
                gridArea="unit"
                data={price_original}
            />
            <OrderItemCardPricebox
                key="orderitemcard-subtotal"
                title="SUBTOTAL"
                gridArea="subtotal"
                data={price_subtotal}
            />
        </div>
    )
}

export default OrderItemCard;
