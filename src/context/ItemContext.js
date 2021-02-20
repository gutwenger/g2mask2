import React, { useContext, useState } from "react";
import { SERVER_URL } from "../util/serverVariables";

const ItemContext = React.createContext();

export function useItems() {
    return useContext(ItemContext);
}

export const ItemProvider = ({ children }) => {

    const [items, setItems] = useState(()=>getItems());

    function getItems() {
        // Get Items from server
        fetch(`${SERVER_URL}eshop/masks/`)
        .then(response => response.json())
        .then(result => {
            setItems({
                items: result,
                displayItems: result,
            });
        })
    }

    function getItemDetails(itemID) {
        if (!items || !itemID) return;
        return items.items.filter(item => item.id === itemID);
    }

    function getItemPriceCurrent(itemID) {
        if (!items || !itemID) return;
        let querySet = items.items.filter(item => item.id === itemID)[0];
        // If no item is found, return;
        if (!querySet) return;
        return Number(querySet.price_current);
    }

    function updateItems({ itemID, newItem }) {
        let originalItemIndex = items.items.findIndex(item => item.id === itemID);

        let newItems = items.items;
        newItems[originalItemIndex] = newItem;
        setItems(prevItems => ({...prevItems, items: newItems, displayItems: newItems }))
    }

    async function refreshItems() {
        // Get Items from server
        return fetch(`${SERVER_URL}eshop/masks/`)
        .then(response => response.json())
        .then(result => {
            setItems({
                items: result,
                displayItems: result,
            });
            return true;
        })
    }

    return(
        <ItemContext.Provider value={{ items, setItems, getItems, refreshItems, updateItems, getItemDetails, getItemPriceCurrent }}>
            { children }
        </ItemContext.Provider>
    )
}