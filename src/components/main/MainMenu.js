import React, { useCallback, useEffect, useState } from 'react';
import MainItem from './MainItem';

import { useItems } from "../../context/ItemContext";
import MainEmpty from './MainEmpty';
import { pagination } from '../../util/pagination';
import LoadingSmall from '../loading/LoadingSmall';

const MainMenu = () => {

    const { items } = useItems();

    const handlePagination = useCallback(
        () => {
            if (!items) return;

            let input = items.displayItems.length > 0 ? items.displayItems : items.items;

            let paginatedItems = pagination({ input, itemsPerPage: 4 })

            let result = {
                paginatedItems,
                displayItems: paginatedItems[0],
                pages: paginatedItems.length,
                currentPage: 0,
            }

            return result;
        },
        [items],
    )

    const [paginated, setPaginated] = useState(()=>handlePagination());

    useEffect(() => {
        if (items) {
            setPaginated(()=>handlePagination());
        }
    }, [items, setPaginated, handlePagination])    

    const button = (paginated && paginated.currentPage < paginated.pages - 1) && (
        <button className="mainmenu__showmore standardBtn--2" onClick={()=>showMore()}>Show More</button>
    )


    const displayContent = items
        ? items.displayItems.length > 0
            ? (
                <div id="mainmenu" className="mainmenu">
                    <div id="mainmenu__con" className="mainmenu__con">
                        { paginated && paginated.displayItems.map((item, i) => (
                            <MainItem
                                key={`mainitem-${i}`}
                                item={item}
                            />
                        ))}
                    </div>
                    { button }
                </div>
            )
            : (
                <MainEmpty />
            )
        : (
            <div id="mainmenu" className="mainmenu">
                <LoadingSmall />
            </div>
        )

        function showMore() {
            if (paginated.currentPage === (paginated.pages - 1)) return;
    
            let newCurrentPage = paginated.currentPage + 1;
    
            let newPaginated = {
                ...paginated,
                displayItems: [...paginated.displayItems, ...paginated.paginatedItems[newCurrentPage]],
                currentPage: newCurrentPage,
                next: newCurrentPage < paginated.pages - 1
            }
    
            setPaginated(newPaginated)
            
        }

    return displayContent;
}

export default MainMenu;