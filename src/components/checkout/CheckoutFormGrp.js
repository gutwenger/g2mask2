import React from 'react'

const CheckoutFormGrp = ({ section, label, name, title, type, choices, handleSelectShipping, errors }) => {
    let content;
    let error = Object.keys(errors).length > 0 && errors[section][name];
    let inputError = error && "checkoutForm__grp__text__input__error";
    let radioError = error && "checkoutForm__grp__radio__grp__con__error";

    function handleSelect(event) {
        if (name === "shipping_method") {
            handleSelectShipping(event);
        }
    }

    switch (type) {
        case "text":
            content = (
                <div key={`checkoutForm__grp__text`} className="checkoutForm__grp__text">
                    <label
                        htmlFor={`checkoutForm__grp__text__${section}__${name}`}
                        className="checkoutForm__grp__text__label"
                    >
                        {label}
                    </label>
                    <input
                        id={`checkoutForm__grp__text__${section}__${name}`}
                        type="text"
                        name={`${section}-${name}`}
                        className={`checkoutForm__grp__text__input ${inputError}`}
                        autoComplete="off"
                        required
                    />
                </div>
            )
            break;
        case "number":
            content = (
                <div key={`checkoutForm__grp__text`} className="checkoutForm__grp__text">
                    <label
                        htmlFor={`checkoutForm__grp__text__${section}__${name}`}
                        className="checkoutForm__grp__text__label"
                    >
                        {label}
                    </label>
                    <input
                        id={`checkoutForm__grp__text__${section}__${name}`}
                        type="tel"
                        name={`${section}-${name}`}
                        className={`checkoutForm__grp__text__input ${inputError}`}
                        maxLength="16"
                        autoComplete="off"
                        required
                    />
                </div>
            )
            break;
        case "radio":
            content = (
                <div className="checkoutForm__grp__radio__grp">
                    <p className="checkoutForm__grp__radio__grp__title">
                        {title}
                    </p>
                    <div className={`checkoutForm__grp__radio__grp__con ${radioError}`}>
                        {
                            choices.map((choice, i)=> (
                                <div key={`checkoutForm__grp__radio--${label}--${i}`} className="checkoutForm__grp__radio">
                                    <input
                                        id={`checkoutForm__grp__radio__${section}__${choice.value}`}
                                        type="radio"
                                        name={`${section}-${name}`}
                                        className="checkoutForm__grp__radio__input"
                                        value={choice.value}
                                        onChange={(event)=>handleSelect(event)}
                                    />
                                    <label
                                        htmlFor={`checkoutForm__grp__radio__${section}__${choice.value}`}
                                        className="checkoutForm__grp__radio__label"
                                    >
                                        {choice.display}
                                    </label>
                                </div>
                            ))
                        }
                    </div>
                </div>
            )
            break;
        default:
            break;
    }

    return (
        <div className="checkoutForm__grp">
            { content }
            { error && <p className="checkoutForm__grp__error">{ errors[section][name] }</p>}
        </div>
    )
}

export default CheckoutFormGrp;
