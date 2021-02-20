import React from 'react'

const OrderAddressCard = ({ address, title }) => {
    const details = address && [address.firstname, address.lastname, address.flat, address.apartment, address.street, address.area, address.district];
    const content = details
        ? (
            <div className="orderAddressCard__content">
                {details.map((item, i) => (
                    <p key={`orderaddresscard-content-${title.toLowerCase()}-${i}`} className="orderAddressCard__content__p">
                        {item}
                    </p>
                ))}
            </div>
        )
        : (
            <div className="orderAddressCard__content">
                <p className="orderAddressCard__content__p">
                    Nil.
                </p>
            </div>
        )
    
    return (
        <div className="orderAddressCard">
            <p className="orderAddressCard__title">
                {title}
            </p>
            {content}
        </div>
    )
}

export default OrderAddressCard;