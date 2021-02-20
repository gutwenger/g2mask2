import React, { useState } from 'react';

import { useCart } from "../../context/CartContext";
import { useMessage } from "../../context/MessageContext";

import CartItemCardImg from './CartItemCardImg';
import CartItemCardInfo from './CartItemCardInfo';
import CartItemCardQuantity from './CartItemCardQuantity';
import CartItemCardSubtotal from './CartItemCardSubtotal';

const CartItemCard = ({ 
    item: { 
            id, size,
            mask: { name, brand, img, is_sale, price_current, price_original },
            cart: { quantity }
        }
    }) => {

    const { removeCartItem } = useCart();
    const { displayMessage } = useMessage();

    const [currentQuantity, setCurrentQuantity] = useState(quantity);

    function handleRemove() {
        removeCartItem(id);
        displayMessage({ type: "Success", content: "Item removed from cart." })
    }

    return (
        <div className="cartItemCard">
            <CartItemCardImg
                key={`cartitemcartimg-${id}-${size.trim()}`}
                img={img}
                alt={name}
            />
            <CartItemCardInfo
                key={`cartitemcartinfo-${id}-${size.trim()}`}
                name={name}
                brand={brand.name}
                size={size}
            />
            <CartItemCardQuantity
                key={`cartitemcardquantity-${id}-${size.trim()}`}
                currentQuantity={currentQuantity}
                itemID={id}
                size={size}
                setCurrentQuantity={setCurrentQuantity}
            />
            <CartItemCardSubtotal
                key={`cartitemcardsubtotal-${id}-${size.trim()}`}
                subtotal={Number(price_current * quantity).toFixed(1)}
            />
            <button className="cartItemCard__remove" onClick={()=>handleRemove()}>
                <i className="cartItemCard__remove__i fas fa-times"></i>
            </button>
        </div>
    )
}
export default CartItemCard;
