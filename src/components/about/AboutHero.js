import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const AboutHero = () => {

    let filterRef = useRef();
    const [sloganActivate, setSloganActivate] = useState(false);

    const slogan1 = (
        <div className="aboutHero__slogan">
            <h1 className="aboutHero__slogan__h1">
                WEARING MASK IS
            </h1>
            <p className="aboutHero__slogan__p">
                UNCOMFORTABLE?
            </p>
            <p className="aboutHero__slogan__p">
                DIFFICULT TO BREATHE?
            </p>
            <p className="aboutHero__slogan__p">
                EXPENSIVE?
            </p>
        </div>
    )

    const slogan2 = (
        <div className="aboutHero__slogan aboutHero__slogan--activate">
            <p className="aboutHero__slogan__p">
                ENJOY EVERY BREATH AGAIN
            </p>
        </div>
    );

    function handleMouseOverBtn() {
        setSloganActivate(prevState => !prevState);
        filterRef.current.className = filterRef.current.className === "aboutHero__filter aboutHero__filter__activate"
            ? "aboutHero__filter aboutHero__filter__notactivate"
            : "aboutHero__filter aboutHero__filter__activate";
    }

    return (
        <div id="aboutHero" className="aboutHero">
            <div className="aboutHero__filter aboutHero__filter__activate" ref={filterRef} />
            {sloganActivate ? slogan2: slogan1}
            <div className="aboutHero__btn">
                <Link to="/" className="aboutHero__link" onMouseOver={()=>handleMouseOverBtn()} onMouseLeave={()=>handleMouseOverBtn()}>
                    SHOP NOW
                </Link>
            </div>
        </div>
    )
}

export default AboutHero;