import React from 'react'

const CheckoutInfoPriceCard = ({ title, price }) => {
    return (
        <div className="checkoutInfo__display__priceCard">
            <p className="checkoutInfo__display__priceCard__title">
                {title}
            </p>
            <p className="checkoutInfo__display__priceCard__price">
                $ {price}
            </p>
        </div>
    )
}

export default CheckoutInfoPriceCard;