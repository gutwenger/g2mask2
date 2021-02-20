import React, {  } from 'react';
import { Link } from "react-router-dom";

const MainItem = ({ item: { id, brand, name, price_current, price_original, img, is_sale  }}) => {

    let price = is_sale
        ? (
            <div className="mainitem__down">
                <p className="mainitem__down__priceCurrent mainitem__down__priceCurrent--sale">{price_current}</p>
                <p className="mainitem__down__priceOriginal">{price_original}</p>
            </div>
        )
        : (
            <div className="mainitem__down">
                <p className="mainitem__down__priceCurrent">{price_current}</p>
            </div>
        )

    return (
        <Link to={`/g2mask2/item/${id}`} className="mainitem">
            <div className="mainitem__up">
                <img src={img} className="mainitem__up__img" alt={name} />
            </div>
            <div className="mainitem__details">
                <div className="mainitem__mid">
                    <p className="mainitem__mid__name">{name}</p>
                    <p className="mainitem__mid__brand">{brand.name}</p>
                </div>
                {price}
            </div>
        </Link>
    )
}

export default MainItem;
