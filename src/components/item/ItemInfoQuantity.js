import React from 'react'

const ItemInfoQuantity = ({ inventory, handleChangeQuantity, defaultValue }) => {

    const numberOfOptions = inventory > 10 ? 10 : inventory;

    const options = [];

    if (numberOfOptions === 0) {
        options.push(
            <option key="quantity-option-outofstock" value="out-of-stock" disabled>OUT OF STOCK</option>
        );
    } else {
        for (let i = 1; i <= numberOfOptions; i++) {
            options.push(
                <option
                    key={`quantity-option-${i}`}
                    value={i}
                >
                    {i}
                </option>
            )
        }
    }

    return (
        <select className="itemInfo__variations__select" value={defaultValue} onChange={(event)=>handleChangeQuantity(event)}>
            <option
                key="variation-default"
                value="default"
                disabled
            >
                Select Quantity
            </option>
            {options}
        </select>
    )
}

export default ItemInfoQuantity;