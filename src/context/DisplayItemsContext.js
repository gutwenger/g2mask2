import React, { useContext, useState } from "react";
import { SERVER_URL } from "../util/serverVariables";

import { useItems } from "./ItemContext"; // Import items for filter

const DisplayItemsContext = React.createContext();

export function useDisplayItems() {
    return useContext(DisplayItemsContext);
}

export const DisplayItemsProvider = ({ children }) => {

    const { items, setItems } = useItems(); // Import items for filter

    const [filter, setFilter] = useState(()=>getFilter());
    const [filterOptions, setFilterOptions] = useState({
        type: [],
        protection: [],
        origin: [],
        brand: []
    })
    const [sortOption, setSortOption] = useState('newest');

    function getFilter() {
        fetch(`${SERVER_URL}eshop/filter/`)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            setFilter(result);
        })
    }

    function changeFilter({ category, value }) {
        let newfilterChoices = filterOptions[category];

        // If the original filterItems does not include input value, delete from original filterItems
        if (newfilterChoices.includes(value)) {
            newfilterChoices = newfilterChoices.filter(item => item !== value);
        // Else, push to original filerItems
        } else {
            newfilterChoices.push(value);
        }
        
        let newFilterOptions = {...filterOptions, [category]: newfilterChoices};

        // Set filterItems
        setFilterOptions(newFilterOptions);

        filterItems({ options: newFilterOptions });

    }

    function resetFilter() {
        let newItems = {
            ...items,
            displayItems: items.items
        }
        setSortOption('newest');
        setItems(newItems);
        setFilterOptions({
            type: [],
            protection: [],
            origin: [],
            brand: []
        })
    }

    function filterItems({ options }) {
        let result = new Set(items.items);

        for (const key in options) {

            // If type is empty, skip 
            if (options[key].length === 0) continue;

            // Create temporary variables
            let temp = new Set(result);
            let tempResult = new Set();

            // Iterate through temp to check if every item in the set matches every user's filter criteria
            // If match, add to a temporary set and update the result set when finish
            options[key].forEach(option => {

                let filteredResult = [];

                switch (key) {
                    case "type": 
                        filteredResult = [...temp].filter(item => option === item.mask_type.category);
                        break;
                    case "protection":
                        filteredResult = [...temp].filter(item => item.protections.includes(option));
                        break;
                    case "origin":
                        filteredResult = [...temp].filter(item => option === item.origin.country);
                        break;
                    case "brand":
                        filteredResult = [...temp].filter(item => option === item.brand.name);
                        break;
                    default:
                        break;
                }

                filteredResult.forEach(item => tempResult.add(item));

            })
            result = new Set(tempResult);
        }

        let filteredItems = Array.from(result);
        setItems(prevItems => ({
            ...prevItems,
            displayItems: filteredItems
        }))
        
    }

    function sortItems({ option }) {

        const SORT_FUNCTIONS = {
            newest: (a, b) => new Date(b.timestamp_updated) - new Date(a.timestamp_updated),
            oldest: (a, b) => new Date(a.timestamp_updated) - new Date(b.timestamp_updated),
            priceLow: (a, b) => a.price_current - b.price_current,
            priceHigh: (a, b) => b.price_current - a.price_current
        }
        setSortOption(option);
        setItems(prevItems => ({
            ...prevItems,
            displayItems: items.displayItems.sort(SORT_FUNCTIONS[option])
        }))
        
    }

    return(
        <DisplayItemsContext.Provider value={{ filter, filterOptions, changeFilter, resetFilter, sortOption, sortItems }}>
            { children }
        </DisplayItemsContext.Provider>
    )
}