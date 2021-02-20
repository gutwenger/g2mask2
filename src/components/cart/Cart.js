import React from 'react';
import { Link } from "react-router-dom";

import { useCart } from "../../context/CartContext";
import LoadingLarge from '../loading/LoadingLarge';

import CartItems from "./CartItems";
import CartTotal from "./CartTotal";

const Cart = () => {

    const { currentCart } = useCart();

    const normalDisplay = (
        <div id="cartContent" className="cartContent">
            <CartItems />
            <CartTotal />
        </div>
    )

    const emptyDisplay = (
        <div className="cartEmpty">
            <h1 className="cartEmpty__h1">CART EMPTY</h1>
            <i className="cartEmpty__i fas fa-box-open"></i>
            <Link className="cartEmpty__btn standardBtn--2" to="/g2mask2/">SHOP NOW</Link>
        </div>
    )

    const content = currentCart
        ? currentCart.length > 0
            ? normalDisplay
            : emptyDisplay
        : <LoadingLarge />

    return (
        <div id="cart" className="cart">
            <h1 className="cart__h1">CART</h1>
            {content}
        </div>
    )
}

export default Cart;