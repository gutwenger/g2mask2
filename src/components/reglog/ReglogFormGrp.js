import React from 'react'

const ReglogFormGrp = ({ label, type, error, name }) => {

    const inputErrorClass = error && "reglog__form__grp__input__error"

    return (
        <div className="reglog__form__grp">
            <label htmlFor={`reglog-form-${label.replace(" ", "").toLowerCase()}`} className="reglog__form__grp__label">
                { label }
            </label>
            <input
                id={`reglog-form-${label.replace(" ", "").toLowerCase()}`}
                className={`reglog__form__grp__input ${inputErrorClass}`}
                type={type}
                name={`${label.replace(" ", "").toLowerCase()}`}
                autoComplete="off"
                required
            />
            <p className="reglog__form__grp__error">{error}</p>
        </div>
    )
}

export default ReglogFormGrp;