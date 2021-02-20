import React, { useState } from 'react';
import LoadingSmall from "../loading/LoadingSmall";

const ItemReviewsForm = ({ submitReview }) => {

    const [loading, setLoading] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();

        if (event.target.content.value.trim() === "") return;

        setLoading(true);
        submitReview(event.target.content.value).then(result => {
            if (result) {
                setLoading(false);
                event.target.content.value = '';
            }
        })
    }

    let display = loading
        ? (
            <LoadingSmall />
        )
        : (
            <form id="itemReviews__form" className="itemReviews__form" onSubmit={(event)=>handleSubmit(event)}>
                <label className="itemReviews__form__label">We appreciate your comment:</label>
                <textarea
                    id="itemReviews__form__textarea"
                    className="itemReviews__form__textarea"
                    autoComplete="off"
                    name="content"
                    rows="5"
                    required
                />
                <button type="submit" className="standardBtn itemReviews__form__btn">Submit</button>
            </form>
        )

    return display;
}

export default ItemReviewsForm;