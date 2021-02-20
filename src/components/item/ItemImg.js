import React from 'react';
// import InnerImageZoom from 'react-inner-image-zoom';
// import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';

const ItemImg = ({ img }) => {

    /*
    const image = (
        <InnerImageZoom 
            className="itemImg__img" 
            src={img} 
            alt="product"
            fullscreenOnMobile={true}
        />
    )
    */

    return (
        <div id="itemimg" className="itemImg">
            <img 
                className="itemImg__img" 
                src={img} 
                alt="product"
            />
        </div>
    )
}

export default ItemImg;