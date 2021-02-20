import React, { useContext, useEffect, useState } from "react";

import { SERVER_URL } from "../util/serverVariables";
import { useItems } from "./ItemContext";

const CartContext = React.createContext();

export function useCart() {
    return useContext(CartContext);
}

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState(()=>checkPreviousCart());
    const [currentCart, setCurrentCart] = useState(null);
    const [subtotal, setSubtotal] = useState(0);
    const { getItemPriceCurrent } = useItems();

    useEffect(() => {
        checkPreviousCart();

        function getCartLatestDetails() {
            if (cart.length === 0) {
                setCurrentCart([]);
                return
            };
            let items = cart.map(item => item.variationID);
            
            fetch(`${SERVER_URL}eshop/masks_variations_details/`, {
                method: "POST",
                body: JSON.stringify({
                    items
                }),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
            .then(response => response.json())
            .then(result => {
                result = result.map((item, i) => ({...item, cart: cart[i]}));
                setCurrentCart(result);
                let initialSubtotal = result.reduce((acc, cur) => (acc + (cur.cart.quantity * cur.mask.price_current)), 0);
                setSubtotal(initialSubtotal.toFixed(1));
            })
        }
        getCartLatestDetails();
    }, [cart])

    function checkPreviousCart() {
        // Get user from localStorage
        let PrevCart = localStorage.getItem("cart");

        // If there's no data, then user is not logged in
        if (!PrevCart) return [];

        // If there's data, get AccessToken
        return JSON.parse(PrevCart);
    }

    function getCartTotalItems() {
        return cart ? cart.length : 0;
    }

    function getCartSubtotal() {
        let result = cart.reduce((acc, cur)=> acc + (cur.quantity * getItemPriceCurrent(cur.itemID)), 0).toFixed(1);
        setSubtotal(result);
        return result;
    }

    async function getCartLatestDetails() {
        let items = cart.map(item => item.variationID);
        
        return fetch(`${SERVER_URL}eshop/masks_variations_details/`, {
                    method: "POST",
                    body: JSON.stringify({
                        items
                    }),
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                })
                .then(response => response.json())
                .then(result => {
                    console.log(result);
                    return result;
                })
    }

    function updateCart(newCart) {
        localStorage.setItem("cart", JSON.stringify(newCart));
        setCart(newCart);
    }

    function addCartItem({ itemID, variationID, quantity }) {
        // Check quantity validity
        if (!checkQuantityValidity(quantity) || !variationID) return;
                
        // Check if user has already put the item into the cart
        let prevItemIndex = getPrevCartItemIndex(variationID);

        // If already in the cart, amend quantity
        if (prevItemIndex >= 0) {
            changeCartItemQuantity({ prevItemIndex, variationID, quantity });
        // Else, push to cart as new cart item
        } else {
            const cartItem = { itemID, variationID, quantity };
            const newCart = [...cart, cartItem]
            updateCart(newCart);
        }
    }

    function removeCartItem(variationID) {
        const newCart = cart.filter(item => item.variationID !== variationID);
        updateCart(newCart);
    }

    function changeCartItemQuantity({ prevItemIndex, variationID, quantity }) {   
        // Check quantity validity
        if (!checkQuantityValidity(quantity)) return;

        // If no prevItemIndex is provided, check if user has already put the item into the cart
        if (!prevItemIndex) {
            prevItemIndex = getPrevCartItemIndex(variationID);
            if (prevItemIndex < 0) return;
        }

        // Cart item quantity cannot be smaller than 0 or larger than 50
        let newQuantity = quantity;
        if (newQuantity > 50 || newQuantity < 0 ) return;

        // Set new quantity
        cart[prevItemIndex].quantity = newQuantity;
        const newCart = cart;
        updateCart(newCart);
    }

    function checkQuantityValidity(quantity) {
        // Quantity cannot be larger than 50 or smaller than -50
        return quantity >= -50 || quantity <= 50;
    }

    function getPrevCartItemIndex(variationID) {
        // Return the index of the cart item
        return cart.findIndex(item => item.variationID === variationID);
    }

    function resetCart() {
        setCart([]);
        setCurrentCart([]);
        setSubtotal(0);
        localStorage.removeItem("cart");
    }

    return(
        <CartContext.Provider value={{ cart, setCart, currentCart, subtotal, getCartTotalItems, getCartSubtotal, getCartLatestDetails, addCartItem, removeCartItem, changeCartItemQuantity, checkQuantityValidity, resetCart }}>
            { children }
        </CartContext.Provider>
    )
}