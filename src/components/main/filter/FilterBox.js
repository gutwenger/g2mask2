import React, { } from 'react';
import { useDisplayItems } from "../../../context/DisplayItemsContext";

const FilterBoxOptions = ({ option: { id, category, choice, value } }) => {
    
    const { filterOptions, changeFilter } = useDisplayItems();

    return (
        <div className="filterbox__option">
            <input 
                type="checkbox" 
                id={`filterbox-option-${value}`} 
                className="filterbox__option__input" 
                name={category} 
                value={id} 
                onChange={()=>changeFilter({category, value})}
                checked={filterOptions[category].includes(value)}
            />
            <div className="filterbox__option__div"></div>
            <label htmlFor={`filterbox-option-${value}`} className="filterbox__option__label" >{choice}</label>
        </div>
    )
}

const FilterBox = ({ filterType, options }) => {
    return (
        <div id={`filterbox-${filterType}`} className="filterbox">
            <h3 className="filterbox__h3">{filterType}</h3>
            <div className="filterbox__options">
                {options.map((option, i) => (
                    <FilterBoxOptions
                        key={`filterboxoptions-${filterType}-${i}`}
                        option={option}
                    />
                ))}
            </div>
        </div>
    )
}

export default FilterBox;