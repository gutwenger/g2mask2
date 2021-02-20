import React from 'react'

import { useAuth } from "../../context/AuthContext";

import ItemReviewsCon from './ItemReviewsCon';
import ItemReviewsForm from './ItemReviewsForm';

const ItemReviews = ({ reviews, submitReview }) => {

    const { user } = useAuth();

    const content = reviews.length > 0
        ? (
            <ItemReviewsCon
                key="itemreviewscon"
                reviews={reviews}
            />
        )
        : (
            <p className="itemReviews__empty">
                There's no review, yet.
            </p>
        )

    return (
        <div id="itemReviews" className="itemReviews">
            <h2 className="itemReviews__h2">
                REVIEWS
            </h2>
            {content}
            {user && <ItemReviewsForm submitReview={submitReview} />}
        </div>
    )
}

export default ItemReviews;