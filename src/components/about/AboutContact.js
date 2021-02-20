import React, { useState } from 'react'
import AboutContactForm from './AboutContactForm';

const AboutContact = () => {

    const [sent, setSent] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        setSent(prevState => !prevState);
    }

    let displayContent = sent
        ? (
            <div className="aboutContact__thanks">
                <i className="aboutContact__thanks__i fas fa-heart"></i>
                <p className="aboutContact__thanks__p">
                    THANK YOU!
                </p>
                <p className="aboutContact__thanks__p">
                    We will get back to you soon!
                </p>
            </div>
        )
        : (
            <AboutContactForm 
                handleSubmit={handleSubmit}
            />
        )


    return (
        <div id="aboutContact" className="aboutContact">
            <h2 className="aboutContact__h2">
                CONTACT US
            </h2>
            <p className="aboutContact__p">
                We'd like to hear from you!
            </p>
            {displayContent}
        </div>
    )
}

export default AboutContact;