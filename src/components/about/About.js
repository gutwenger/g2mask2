import React from 'react'
import AboutHero from './AboutHero'
import AboutUs from './AboutUs'
import AboutDo from './AboutDo'
import AboutContact from './AboutContact'

const Home = () => {
    return (
        <div id="about" className="about">
            <AboutHero />
            <AboutUs />
            <AboutDo />
            <AboutContact />
        </div>
    )
}

export default Home;