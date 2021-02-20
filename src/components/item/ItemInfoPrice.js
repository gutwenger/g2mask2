import React from 'react'

const ItemInfoPrice = ({ isSale, priceCurrent, priceOriginal }) => {

    const priceCurrentClass = isSale && "itemInfo__price__current__sale";

    const priceOriginalContent = isSale && (
        <p className="itemInfo__price__original">
            {priceOriginal}
        </p>
    )

    return (
        <div className="itemInfo__price">
            <p className={`itemInfo__price__current ${priceCurrentClass}`}>
                <span className="itemInfo__price__current__sign">$</span> {priceCurrent}
            </p>
            {priceOriginalContent}
        </div>
    )
}

export default ItemInfoPrice;