import React from 'react'

const ItemInfoProtections = ({ protections }) => {
    return (
        <div id="itemInfo__protections" className="itemInfo__protections">
            {protections.map((protection, i) => (
                <p key={`protection-${i}`} className="itemInfo__protections__protection">
                    {protection}
                </p>
            ))}
        </div>
    )
}

export default ItemInfoProtections;