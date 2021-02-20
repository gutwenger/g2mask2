import React from 'react';

import { useCart } from '../../context/CartContext';
import LoadingSmall from '../loading/LoadingSmall';
import CartItemCard from './CartItemCard';

const CartItems = () => {


    const { currentCart } = useCart();
    
    const cartItemsDisplay = currentCart && (
        currentCart.map((item, i) => (
            <CartItemCard
                key={`cartitemcard-${i}`}
                item={item}
            />
        ))
    )

    const content = currentCart
        ? cartItemsDisplay
        : <LoadingSmall />

    return (
        <div id="cartItems" className="cartItems">
            {content}
        </div>
    )
}

export default CartItems;
