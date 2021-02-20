import React from 'react';
import { Link } from "react-router-dom";
import ReglogFormGrp from './ReglogFormGrp';

const ReglogForm = ({ page, forms, btnLabel, name, handleSubmit, submitError }) => {

    const reglogLink = btnLabel === "Register"
        ? (
            <p className="reglog__link">
                Alredy have an account? 
                <Link to="/g2mask2/login" className="reglog__link__link">LOGIN NOW!</Link>
            </p>
        )
        : (
            <p className="reglog__link">
                Don't have an account? 
                <Link to="/g2mask2/register" className="reglog__link__link">REGISTER Now!</Link>
            </p>
        )

    return (
        <form className="reglog__form" onSubmit={(event)=>handleSubmit(event)}>
            <h2 className="reglog__form__h2">{ page }</h2>
            {forms.map(({key, label, type, error})=> (
                <ReglogFormGrp
                    key={key}
                    label={label}
                    type={type}
                    error={error}
                    name={name}
                />
            ))}
            {submitError && <p className="reglog__form__submit__error">{submitError}</p>}
            <button className="reglog__form__btn standardBtn">{ btnLabel}</button>
            { reglogLink }
        </form>
    )
}

export default ReglogForm;