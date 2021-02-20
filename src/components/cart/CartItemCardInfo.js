import React from 'react'

const CartItemCardInfo = ({ name, brand, size }) => {
    return (
        <div className="cartItemCard__info">
            <p className="cartItemCard__info__name">
                {name}
            </p>
            <p className="cartItemCard__info__brand">
                {brand}
            </p>
            <p className="cartItemCard__info__size">
                {size}
            </p>
        </div>
    )
}

export default CartItemCardInfo;