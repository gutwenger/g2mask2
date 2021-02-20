import React, { useCallback, useEffect, useState } from 'react';

import ItemReviewsCard from "./ItemReviewsCard";

import { pagination } from "../../util/pagination";

const ItemReviewsCon = ({ reviews }) => {

    const setReviewsCallback = useCallback(
        (prevReviews) => {
            // SORT reviews
            let sortedReviews = reviews.sort((a, b) => b.id - a.id);
        
            // PAGINATE reviews
            let paginatedReviews = pagination({ input: sortedReviews, itemsPerPage: 5 });

            let result = {
                reviews,
                paginatedReviews,
                pages: paginatedReviews.length,
                displayReviews: paginatedReviews[0],
                currentPage: 0,
                next: paginatedReviews.length - 1 > 0
            }

            if (prevReviews) {
                result.currentPage = prevReviews.currentPage + 1;
                result.next = prevReviews.currentPage + 1 < paginatedReviews.length
            }

            // SET reviews
            return result
        },
        [reviews],
    )

    const [processedReviews, setProcessedReviews] = useState(()=>setReviewsCallback());

    useEffect(() => {
        setProcessedReviews(()=>setReviewsCallback())
    }, [reviews, setReviewsCallback])

    function showMore() {
        if (processedReviews.currentPage === (processedReviews.pages - 1)) return;

        let newCurrentPage = processedReviews.currentPage + 1;

        let newProcessedReviews = {
            ...processedReviews,
            displayReviews: [...processedReviews.displayReviews, ...processedReviews.paginatedReviews[newCurrentPage]],
            currentPage: newCurrentPage,
            next: newCurrentPage < processedReviews.pages - 1
        }

        setProcessedReviews(newProcessedReviews)
        
    }

    return (
        <div id="itemReviews__con" className="itemReviews__con">
            {processedReviews.displayReviews.map((review, i) => (
                <ItemReviewsCard
                    key={`itemreviewscard-${i}`}
                    review={review}
                />
            ))}
            {processedReviews.next && <button className="itemReviews__con__showMore standardBtn--2" onClick={()=>showMore()}>Show more</button>}
        </div>
    )
}

export default ItemReviewsCon;