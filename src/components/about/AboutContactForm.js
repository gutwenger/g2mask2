import React from 'react'

const AboutContactFormGrp = ({ label, type }) => {

    let input = type === "textarea"
        ? (
            <textarea
                id={`aboutContact__form--${label}`}
                className="aboutContact__form__grp__textarea"
                autoComplete="off"
                rows="5"
                required
            >
            </textarea>
        )
        : (
            <input 
                id={`aboutContact__form--${label}`}
                className="aboutContact__form__grp__input"
                type={type}
                autoComplete="off"
                required
            />
        )

    return (
        <div className="aboutContact__form__grp">
            <label htmlFor={`aboutContact__form--${label}`} className="aboutContact__form__grp__label">{ label }</label>
            {input}
        </div>
    )
}

const AboutContactForm = ({ handleSubmit }) => {
    return (
        <form className="aboutContact__form" onSubmit={(event)=>handleSubmit(event)}>
                <AboutContactFormGrp
                    key="aboutcontactform-name"
                    label="Name"
                    type="text"
                /> 
                <AboutContactFormGrp
                    key="aboutcontactform-email"
                    label="Email"
                    type="email"
                />
                <AboutContactFormGrp
                    key="aboutcontactform-text"
                    label="Message"
                    type="textarea"
                /> 
            <button className="aboutContact__form__btn standardBtn--2">Submit</button>
        </form>
    )
}

export default AboutContactForm;