import React from 'react'
import CheckoutFormGrp from './CheckoutFormGrp'

export const CheckoutFormItem = ({ title, fields, section, errors, handleSelectShipping }) => {
    return (
        <div className="checkoutForm__address">
            <h1 className="checkoutForm__address__h1">
                {title}
            </h1>
            {
                fields.map((item, i) => (
                    <CheckoutFormGrp
                        key={`checkoutformgrp-${i}`}
                        section={section}
                        label={item.label}
                        name={item.name}
                        type={item.type}
                        choices={item.choices}
                        title={item.title}
                        errors={errors}
                        handleSelectShipping={handleSelectShipping}
                    />
                ))
            }
        </div>
    )
}

export default CheckoutFormItem;