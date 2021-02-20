import React from 'react'

const CheckoutInfoItemCard = ({ item: { mask: { name, brand, price_current }, size, cart:{ quantity } }}) => {

    const price = (Number(price_current) * quantity).toFixed(1);

    return (
        <div className="checkoutInfo__itemCard">
            <div className="checkoutInfo__itemCard__details">
                <p className="checkoutInfo__itemCard__name">
                    { name }
                </p>
                <p className="checkoutInfo__itemCard__brand">
                    { brand.name }
                </p>
                <p className="checkoutInfo__itemCard__size">
                    { size }
                </p>
                <p className="checkoutInfo__itemCard__quantity">
                    QUANTITY: <span className="checkoutInfo__itemCard__quantity__span">{ quantity }</span>
                </p>
            </div>
            <div className="checkoutInfo__itemCard__price">
                <p className="checkoutInfo__itemCard__price__price">
                    $ { price }
                </p>
            </div>
        </div>
    )
}

export default CheckoutInfoItemCard;