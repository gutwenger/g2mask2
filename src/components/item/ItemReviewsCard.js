import React from 'react';
import moment from "moment";

const ItemReviewsCard = ({ review: { id, review, timestamp, user } }) => {
    return (
        <div id={`review-${"1"}`} className="itemReviews__card">
            <div className="itemReviews__card__info">
                <p className="itemReviews__card__info__p">
                    {user.username}
                    <span className="itemReviews__card__info__span">
                        •
                    </span>
                    {moment(timestamp).fromNow()}
                </p>
            </div>
            <div className="itemReviews__card__content">
                <p className="itemReviews__card__content__p">
                    {review}
                </p>
            </div>
        </div>
    )
}

export default ItemReviewsCard;