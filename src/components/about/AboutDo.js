import React from 'react';


const AboutDoCard = ({ job: { icon, name } }) => {
    return (
        <div className="aboutDo__card">
            <i className={`aboutDo__card__i ${icon}`} />
            <p className="aboutDo__card__p">{name}</p>
        </div>
    )
}

const AboutDo = () => {

    const ourJobs = [
        {
            icon: "fas fa-search",
            name: "WE FIND",
        },
        {
            icon: "fas fa-tags",
            name: "WE SELL",
        },
        {
            icon: "fas fa-truck-loading",
            name: "WE DELIVER",
        }
    ]

    return (
        <div className="aboutDo">
            <h1 className="aboutDo__h1">
                What we do?
            </h1>
            <div className="aboutDo__con">
                {ourJobs.map((job, i) => (
                    <AboutDoCard
                        key={`aboutdo-${i}`}
                        job={job}
                    />
                ))}
            </div>
            <p className="aboutDo__p">
                With us, you don't have to worry about price and quality anymore!
            </p>
            <p className="aboutDo__p">
                We do the most complicated tasks for you, so you can:
            </p>
            <ul className="aboutDo__ul">
                <li className="aboutDo__li"><i className="aboutDo__li__i fas fa-check-circle"></i> CHOOSE the best masks of the world</li>
                <li className="aboutDo__li"><i className="aboutDo__li__i fas fa-check-circle"></i> BUY at the lowest possible price</li>
                <li className="aboutDo__li"><i className="aboutDo__li__i fas fa-check-circle"></i> RECEIVE in the most convient way</li>
            </ul>
        </div>
    )
}

export default AboutDo;
