import React, { useRef, useState } from 'react'
import LoadingSmall from '../../loading/LoadingSmall';
import { useDisplayItems } from "../../../context/DisplayItemsContext";
import FilterBox from './FilterBox';

const Filter = () => {

    const { filter, resetFilter } = useDisplayItems();
    const [isOpen, setIsOpen] = useState(false);
    let filterRef = useRef();
    let filterBtnIconRef = useRef();

    function handleOpen() {

        // Set filter open/close
        setIsOpen(prevIsOpen => !prevIsOpen);

        // If filter is opened
        if (isOpen) {
            // Add filter button animation
            filterBtnIconRef.current.classList.replace("filter__up__btn__i--open", "filter__up__btn__i--close");
            // Remove filter border
            filterRef.current.style.border = "1px solid transparent";
        // Else if filter is closed
        } else {
            // Add filter button animation
            filterBtnIconRef.current.classList.replace("filter__up__btn__i--close", "filter__up__btn__i--open");
            // Add filter border
            filterRef.current.style.border = "1px solid #ff33a0";
        }
    }

    const filterContent = filter
        ? (
            <div className="filter__content">
                <div className="filter__down">
                    <FilterBox
                        key="filterbox-type"
                        filterType="TYPE"
                        options={filter.type}
                    />
                    <FilterBox
                        key="filterbox-protection"
                        filterType="PROTECTION"
                        options={filter.protection}
                    />
                    <FilterBox
                        key="filterbox-origin"
                        filterType="ORIGIN"
                        options={filter.origin}
                    />
                    <FilterBox
                        key="filterbox-brand"
                        filterType="BRAND"
                        options={filter.brand}
                    />
                </div>
                <button className="standardBtn" onClick={()=>resetFilter()}>RESET</button>
            </div>
        )
        : (
            <LoadingSmall />
        )

    const filterDisplay = isOpen && filterContent;

    return (
        <div id="filter" className="filter" ref={filterRef}>
            <div className="filter__up">
                <button className="filter__up__btn" onClick={()=>handleOpen()}>
                    <p className="filter__up__btn__p">Filter</p>
                    <i className="filter__up__btn__i filter__up__btn__i--close fas fa-plus" ref={filterBtnIconRef}></i>
                </button>
            </div>
            { filterDisplay }
        </div>
    )
}

export default Filter;