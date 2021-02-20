import React from 'react'

const CartItemCardSubtotal = ({ subtotal }) => {
    return (
        <div className="cartItemCard__subtotal">
            <p className="cartItemCard__subtotal__title">
                SUBTOTAL
            </p>
            <p className="cartItemCard__subtotal__price">
                {subtotal}
            </p>
        </div>
    )
}

export default CartItemCardSubtotal;
