import React from 'react'

const CartItemCardImg = ({ img, alt }) => {
    return (
        <div className="cartItemCard__img">
            <img className="cartItemCard__img__img" src={img} alt={alt} />
        </div>
    )
}

export default CartItemCardImg;