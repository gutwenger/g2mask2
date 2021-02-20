import React from 'react'

const MainHero = ({ sloganH2, sloganP }) => {
    return (
        <div id="mainhero" className="mainhero">
            <h2 className="mainhero__h2">
                { sloganH2 }
            </h2>
            <p className="mainhero__p">
                { sloganP }
            </p>
            <div className="mainhero__filter" />
        </div>
    )
}

export default MainHero;