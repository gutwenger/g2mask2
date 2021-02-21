import React from 'react';
import { Link } from "react-router-dom";
import { useCart } from '../../context/CartContext';

const CartTotal = () => {

    const { subtotal } = useCart();

    return (
        <div id="cartTotal" className="cartTotal">
            <div className="cartTotal__subtotal">
                <p className="cartTotal__subtotal__title">
                    SUBTOTAL
                </p>
                <p className="cartTotal__subtotal__price">
                    ${subtotal}
                </p>
            </div>
            <Link to="/checkout" className="cartTotal__subtotal__btn standardBtn--2">CHECKOUT</Link>
        </div>
    )
}

export default CartTotal;
