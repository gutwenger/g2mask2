import React from 'react';

import { useDisplayItems } from "../../../context/DisplayItemsContext";

const Sort = () => {

    const { sortOption, sortItems } = useDisplayItems();
    function handleChange(event) {
        let option = event.target.value;
        sortItems({ option });
    }

    return (
        <div id="sort" className="sort">
            <select className="sort__select" value={sortOption} onChange={(event)=>handleChange(event)}>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="priceLow">Price Low to High</option>
                <option value="priceHigh">Price High to Low</option>
            </select>
        </div>
    )
}

export default Sort;