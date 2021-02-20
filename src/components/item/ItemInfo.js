import React from 'react'
import ItemInfoPrice from './ItemInfoPrice'
import ItemInfoProtections from './ItemInfoProtections';
import ItemInfoVariations from './ItemInfoVariations';

const ItemInfo = ({ item: { id, name, brand, description, origin, mask_type, is_sale, price_current, price_original, protections, variations } }) => {
    return (
        <div id="iteminfo" className="itemInfo">
            <h2 className="itemInfo__name">
                {name}
            </h2>
            <p className="itemInfo__brand">
                {brand.name}
            </p>
            <p className="itemInfo__description">
                {description}
            </p>
            <ItemInfoProtections
                key="iteminfoprotections"
                protections={protections}
            />
            <p className="itemInfo__origin">
                This product is made in <span className="itemInfo__origin__span">{origin.country}</span>.
            </p>
            <p className="itemInfo__type">
                This is a <span className="itemInfo__type__span">{mask_type.category.toLowerCase()}</span> mask.
            </p>
            <ItemInfoPrice
                key="iteminfoprice"
                isSale={is_sale}
                priceCurrent={price_current}
                priceOriginal={price_original}
            />
            <ItemInfoVariations
                key="iteminfovariations"
                itemID={id}
                variations={variations}
            />
        </div>
    )
}

export default ItemInfo;