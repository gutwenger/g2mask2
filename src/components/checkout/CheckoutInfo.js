import React from 'react';

import { useCart } from "../../context/CartContext";
import LoadingSmall from '../loading/LoadingSmall';
import CheckoutInfoItemCard from './CheckoutInfoItemCard';
import CheckoutInfoPriceCard from './CheckoutInfoPriceCard';

const CheckoutInfo = ({ shipping, total }) => {

    const { currentCart, subtotal } = useCart();

    const displayInfo = currentCart && subtotal && (
        <div className="checkoutInfo__display">
            <div className="checkoutInfo__display__items">
                {currentCart.map((item, i) => (
                    <CheckoutInfoItemCard
                        key={`checkoutinfodisplayitemcard-${i}`}
                        item={item}
                    />
                ))}
            </div>
            <div className="checkoutInfo__display__price">
                <CheckoutInfoPriceCard
                    key="checkoutinfopricecard-subtotal"
                    title="SUBTOTAL"
                    price={subtotal}
                />
                <CheckoutInfoPriceCard
                    key="checkoutinfopricecard-shipping"
                    title="SHIPPING"
                    price={shipping}
                />
                <CheckoutInfoPriceCard
                    key="checkoutinfopricecard-total"
                    title="TOTAL"
                    price={total}
                />
            </div>
            <button className="checkout__btn standardBtn--2">CONFIRM CHECKOUT</button>
        </div>
    )

    const content = currentCart
        ? displayInfo
        : (
            <LoadingSmall />
        )

    return (
        <div id="checkoutInfo" className="checkoutInfo">
            { content }
        </div>
    )
}

export default CheckoutInfo; 