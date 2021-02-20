import React from 'react'
import OrderAddressCard from './OrderAddressCard'

const OrderAddresses = ({ order: { shipping, billing }}) => {
    return (
        <div id="orderAddresses" className="orderAddresses">
            <OrderAddressCard
                key="orderaddressscard-shipping"
                title="Shipping Address"
                address={shipping}
            />
            <OrderAddressCard
                key="orderaddressscard-billing"
                title="Billing Address"
                address={billing}
            />
        </div>
    )
}

export default OrderAddresses;