import React, { useEffect, useState, useCallback } from 'react';

import { useAuth } from "../../context/AuthContext";
import { useItems } from "../../context/ItemContext";

import LoadingLarge from '../loading/LoadingLarge';
import ItemImg from "./ItemImg";
import ItemInfo from "./ItemInfo";
import ItemReviews from "./ItemReviews";

import { SERVER_URL } from "../../util/serverVariables";

const Item = (props) => {

    const { itemId } = props.match.params;
    const { items, updateItems } = useItems();
    const { user } = useAuth();

    const [item, setItem] = useState("loading");
    const [reviews, setReviews] = useState(null);

    const getItem = useCallback(
        (id) => {
            let result = items.items.filter(item => item.id === Number(id))[0];
            result.reviews && setReviews(result.reviews);
            return result;
        },
        [items],
    )

    useEffect(() => {
        if (items) {
            setItem(getItem(itemId));
        }
    }, [items, getItem, itemId])

    async function submitReview(reviewContent) {
        return fetch(`${SERVER_URL}eshop/customer_review/create/${item.id}`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${user.access}`
            },
            body: JSON.stringify({
                "review": reviewContent
            })
        })
        .then(response => response.json())
        .then(result => {
            setReviews(result);

            // Update item
            let newItem = {...item, reviews: result};
            updateItems({ itemID: item.id, newItem });
            
            return true;
        })
    }

    const displayContent = item === "loading"
        ? (
            <LoadingLarge />
        )
        : item
            ? (
                <div id="itemContent" className="itemContent">
                    <ItemImg 
                        key="itemimg"
                        img={item.img}
                    />
                    <ItemInfo 
                        key="iteminfo"
                        item={item}
                    />
                    <ItemReviews 
                        key="itemreviews"
                        reviews={reviews}
                        itemID={item.id}
                        setReviews={setReviews}
                        submitReview={submitReview}
                    />
                </div>
            )
            : (
                <div id="itemError" className="itemError">
                    <h1 className="itemError__h1">Opps</h1>
                    <i className="itemError__i fas fa-exclamation-triangle"></i>
                    <p className="itemError__p">Item not found.</p>
                </div>
            )

    return (
        <div id="item" className="item">
            { displayContent }
        </div>
    )
}

export default Item;