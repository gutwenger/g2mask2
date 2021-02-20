import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

import { useAuth, useAuthFunctions } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useMessage } from '../../context/MessageContext';

import CheckoutForm from "./CheckoutForm";
import CheckoutInfo from "./CheckoutInfo";

import { SERVER_URL } from "../../util/serverVariables";
import { CHECKOUT_FORM_FIELDS } from "../../data/form";

const Checkout = () => {

    const history = useHistory();
    const { user } = useAuth();
    const { logoutKeepCart } = useAuthFunctions();
    const { cart, subtotal, resetCart } = useCart();
    const { displayMessage } = useMessage();

    const [shipping, setShipping] = useState(0);
    const [shippingMethod, setShippingMethod] = useState("not_selected")
    const [total, setTotal] = useState(()=>calculateTotal());
    const [errors, setErrors] = useState({
        isValid: true,
        shipping_method: {},
        shipping: {},
        billing: {},
        payment: {},
    });

    const shippingPrice = {
        default: 0,
        standard: 20,
        priority: 100,
    }

    useEffect(() => {
        setTotal((Number(subtotal) + shipping).toFixed(1))
    }, [shipping, subtotal])

    function handleSelectShipping() {
        const newShipping = document.querySelector("#checkoutContent")["shipping_method-shipping_method"].value;
        setShipping(shippingPrice[newShipping]);
        setShippingMethod(newShipping);
        setTotal(calculateTotal(shippingPrice[newShipping]));
    }

    function handleSubmit(event) {
        event.preventDefault();

        // Check form validity
        let isValid = checkValidity({ sections: ["shipping_method", "shipping", "billing", "payment"] })
        if (!isValid) return;

        // Get cart data
        let data = getCartData();
        
        // Submit order
        submitOrder(data);
    }

    function calculateTotal(shippingPrice) {
        let price = shippingPrice ? shippingPrice : shipping;
        return (Number(subtotal) + price).toFixed(1);
    }

    function checkValidity({ sections }) {
        const FORM = document.querySelector("#checkoutContent");

        // Reset Errors
        setErrors({
            isValid: true,
            shipping_method: {},
            shipping: {},
            billing: {},
            payment: {},
        })

        let isError = true;
        
        sections.forEach(section => {
            CHECKOUT_FORM_FIELDS[section].forEach(field => {
                let input = FORM[`${section}-${field.name}`].value.trim();
                if (input === "") {
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        [section]: {
                            ...prevErrors[section], 
                            [field.name]: `${field.label} must not be empty.`
                        }
                    }));
                    isError = false;
                }
            });
        })
        return isError;
    }

    function getCartData() {
        // Get user input
        let shippingAddress = getFormInputs({section: "shipping", fields: CHECKOUT_FORM_FIELDS.shipping});
        let billingAddress = getFormInputs({section: "billing", fields: CHECKOUT_FORM_FIELDS.billing});
        let payment = getFormInputs({section: "payment", fields: CHECKOUT_FORM_FIELDS.payment});

        // Data to be returned
        let data = {
            user: user && user.id,
            shipping: shippingAddress,
            billing: billingAddress,
            payment,
            shipping_method: shippingMethod,
            cart: cart
        }
        return data;
    }

    function getFormInputs({section, fields}) {
        const FORM = document.querySelector("#checkoutContent");
        let result = {};
        fields.forEach(field => {
            let input = FORM[`${section}-${field.name}`].value.trim();
            result = {
                ...result,
                [field.name]: input
            };
            input === "" && setErrors(prevErrors => ({
                ...prevErrors,
                isValid: false,
                [section]: {
                    ...prevErrors[section], 
                    [field.name]: `${field.label} must not be empty.`
                }
            }));
        });
        return result;
    }

    function submitOrder(data) {

        let request = {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data)
        };

        request.headers.Authorization = user && `Bearer ${user.access}`;
        console.log(request)

        fetch(`${SERVER_URL}eshop/createorder/`, request)
        .then(response => response.json())
        .then(result => {
            console.log(result)

            if (result.detail && result.detail === "Given token not valid for any token type") {
                displayMessage({ type: "Error", content: "Your previous login session is over. Please login again." });
                logoutKeepCart();
                history.push("/g2mask2/login");
                return;
            }

            resetCart();

            history.push({
                pathname: `/g2mask2/order/${result.uuid}`,
                //state: { item: result }
            });

            return result;
        })
    }

    return (
        <div id="checkout" className="checkout">
            <h1 className="checkout__h1">CHECKOUT</h1>
            <form id="checkoutContent" className="checkoutContent" onSubmit={(event)=>handleSubmit(event)}>
                <CheckoutForm
                    key="checkoutform"
                    shippingMethod={shippingMethod}
                    handleSelectShipping={handleSelectShipping}
                    handleSubmit={handleSubmit}
                    errors={errors}
                />
                <CheckoutInfo 
                    key="checkoutinfo"
                    shipping={shipping}
                    total={total}
                />
            </form>
        </div>
    )
}

export default Checkout;