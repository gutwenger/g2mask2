import React from 'react'

import { useCart } from "../../context/CartContext";

const CartItemCardQuantity = ({ itemID, currentQuantity, setCurrentQuantity }) => {
    
    const { changeCartItemQuantity, getCartSubtotal } = useCart();

    let options = [];

    for (let i = 1; i <= 15; i++) {
        options.push(
            <option
                key={`cartitemcardquantityoption-${i}`}
                value={i}
            >
                {i}
            </option>
        )
    }

    function handleChange(event) {
        let value = event.target.value;
        changeCartItemQuantity({
            variationID: itemID,
            quantity: Number(value)
        })
        setCurrentQuantity(value);
        getCartSubtotal();
    }

    return (
        <div className="cartItemCard__quantity">
            <p className="cartItemCard__quantity__title">
                QUANTITY
            </p>
            <select className="cartItemCard__quantity__select" defaultValue={currentQuantity} onChange={(event)=>handleChange(event)}>
                {options}
            </select>
        </div>
    )
}

export default CartItemCardQuantity;
