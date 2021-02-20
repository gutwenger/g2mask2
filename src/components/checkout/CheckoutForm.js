import React from 'react'

import { CheckoutFormItem } from './CheckoutFormItem';

import { CHECKOUT_FORM_FIELDS } from "../../data/form";

const CheckoutForm = ({ shippingMethod, handleSelectShipping, errors }) => {

    const shippingForm = shippingMethod && (
        <CheckoutFormItem
            key="checkoutformshippingaddresss"
            title="Shipping Address"
            fields={CHECKOUT_FORM_FIELDS.shipping}
            section="shipping"
            errors={errors}
        />
    )

    return (
        <div id="checkoutDetails" className="checkoutDetails">
            <CheckoutFormItem
                key="checkoutform1"
                title="Shipping Method"
                fields={CHECKOUT_FORM_FIELDS.shipping_method}
                section="shipping_method"
                handleSelectShipping={handleSelectShipping}
                errors={errors}
            />
            {shippingForm}
            <CheckoutFormItem
                key="checkoutformbillingaddresss"
                title="Billing Address"
                fields={CHECKOUT_FORM_FIELDS.billing}
                section="billing"
                errors={errors}
            />
            <CheckoutFormItem
                key="checkoutformpayment"
                title="Payment"
                fields={CHECKOUT_FORM_FIELDS.payment}
                section="payment"
                errors={errors}
            />
        </div>
    )
}

export default CheckoutForm; 