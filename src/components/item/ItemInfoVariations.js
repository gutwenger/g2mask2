import React, { useState } from 'react';

import { useCart } from "../../context/CartContext";
import { useMessage } from '../../context/MessageContext';

import ItemInfoQuantity from './ItemInfoQuantity';

const ItemInfoVariations = ({ itemID, variations }) => {

    const { addCartItem } = useCart();
    const { displayMessage } = useMessage();

    const [selectedVariation, setSelectedVariation] = useState("default");
    const [quantity, setQuantity] = useState("default");

    function handleSelect(event) {
        // Get Item Variation ID from user selection
        let selected = Number(event.target.value);

        // Filter out the selected item for retrieving inventory
        let selectedItem = variations.filter(item => item.id === selected)[0];

        // Update state for re-render
        setSelectedVariation(selectedItem);
    }

    function handleChangeQuantity(event) {
        // Get Item Variation ID from user selection
        setQuantity(Number(event.target.value));
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (quantity === "default") {
            displayMessage({ type: "Error", content: "Please select quantity." });
            return;
        }

        addCartItem({
            itemID,
            variationID: selectedVariation.id,
            quantity
        })
        resetState();
        displayMessage({ type: "Success", content: "Item added to cart." })
    }

    function resetState() {
        setSelectedVariation("default");
        setQuantity("default");
    }

    return (
        <form id="itemInfo__variations" className="itemInfo__variations" onSubmit={(event)=>handleSubmit(event)}>
            <select className="itemInfo__variations__select" onChange={(event)=>handleSelect(event)} value={selectedVariation === "default" ? "default" : selectedVariation.id}>
                <option
                    key="variation-default"
                    value="default"
                    disabled
                >
                    Select Size
                </option>
                {variations.map(((variation, i) => (
                    <option
                        key={`variation-${i}`}
                        value={variation.id}
                    >
                        {variation.size}
                    </option>
                )))}
            </select>
            <ItemInfoQuantity
                key="iteminfoquantity"
                inventory={selectedVariation && selectedVariation.inventory}
                defaultValue={quantity}
                handleChangeQuantity={handleChangeQuantity}
            />
            <button className="itemInfo__variations__addCart standardBtn--2">Add to Cart</button>
        </form>
    )
}

export default ItemInfoVariations;