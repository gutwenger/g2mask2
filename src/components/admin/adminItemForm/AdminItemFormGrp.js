import React from 'react';

import { useDisplayItems } from "../../../context/DisplayItemsContext";

const AdminItemFormGrp = ({ item: { title, name, type, choices, choiceSource, fields, required }, error }) => {

    const { filter } = useDisplayItems();

    let options;
    let content;

    switch (type) {
        case "select":
            
            options = choices
                ? (
                    choices.map((choice, i) => (
                        <option key={`choice-${name}-${i}`} value={choice.value}>
                            {choice.display}
                        </option>
                    ))
                )
                : (
                    filter[choiceSource].map((choice, i) => (
                        <option key={`choice-${name}-${i}`} value={choice.id}>
                            {choice.choice}
                        </option>
                    ))
                )

            content = (
                <div className="adminItemFormGrp__con">
                    <select
                        id={`adminItemFormGrp_${name}`}
                        className="adminItemFormGrp__con__select"
                        name={name}
                        defaultValue="default"
                        required
                    >
                        <option value="default" disabled>
                            Select { title }
                        </option>
                        { options }
                        { name === "brand" && (
                            <option value="others">
                                Other. Please provide.
                            </option>
                        )}
                    </select>
                </div>
            )
            break;

        case "checkbox":
            options = choices
                ? (
                    choices.map((choice, i) => (
                        <div key={`${name}-checkbox-${i}`} className="adminItemFormGrp__checkbox">
                            <input
                                id={`${name}-checkbox-${i}`}
                                className="adminItemFormGrp__checkbox__checkbox"
                                type="checkbox"
                                name={name}
                                value={choice.id}
                            />
                            <label className="adminItemFormGrp__checkbox__label">
                                { choice.choice }
                            </label>
                        </div>
                    ))
                )
                : (
                    filter[choiceSource].map((choice, i) => (
                        <div key={`${name}-checkbox-${i}`} className="adminItemFormGrp__checkbox">
                            <input
                                id={`${name}-checkbox-${i}`}
                                className="adminItemFormGrp__checkbox__checkbox"
                                type="checkbox"
                                name={name}
                                value={choice.id}
                                data-name={choice.choice}
                            />
                            <label 
                                htmlFor={`${name}-checkbox-${i}`}
                                className="adminItemFormGrp__checkbox__label"
                            >
                                { choice.choice }
                            </label>
                        </div>
                    ))
                )

            content = (
                <div className="adminItemFormGrp__con">
                    { options }
                </div>
            )
            break;
        
        case "radio":
            options = choices
                ? (
                    choices.map((choice, i) => (
                        <div key={`${name}-radio-${i}`} className="adminItemFormGrp__checkbox">
                            <input
                                id={`${name}-radio-${i}`}
                                className="adminItemFormGrp__checkbox__checkbox"
                                type="radio"
                                name={name}
                                value={choice.value}
                            />
                            <label 
                                htmlFor={`${name}-radio-${i}`}
                                className="adminItemFormGrp__checkbox__label"
                            >
                                { choice.choice }
                            </label>
                        </div>
                    ))
                )
                : (
                    filter[choiceSource].map((choice, i) => (
                        <div key={`${name}-radio-${i}`} className="adminItemFormGrp__checkbox">
                            <input
                                id={`${name}-radio-${i}`}
                                className="adminItemFormGrp__checkbox__checkbox"
                                type="radio"
                                name={name}
                                value={choice.value}
                            />
                            <label 
                                htmlFor={`${name}-radio-${i}`}
                                className="adminItemFormGrp__checkbox__label"
                            >
                                { choice.choice }
                            </label>
                        </div>
                    ))
                )

            content = (
                <div className="adminItemFormGrp__con">
                    { options }
                </div>
            )
            break;

        case "text-text":

            options = fields.map((item, i) => (
                <div key={`adminItemFormGrp__con--texttext-${name}-${i}`} className="adminItemFormGrp__con--texttext">
                    <p className="adminItemFormGrp__con--texttext__p">
                        { item.name.toUpperCase() }
                    </p>
                    <input
                        id={`adminItemFormGrp_${item.name}`}
                        className="adminItemFormGrp__con__text"
                        type="text"
                        name={item.name}
                        required={item.required}
                    />
                </div>
            ))

            content = (
                <div className="adminItemFormGrp__con">
                    { options }
                </div>
            )
            break;

        case "checkbox-text":
            
            options = choices.map((choice, i) => (
                <div key={`${name}-checkboxText-${i}-checkbox`} className="adminItemFormGrp__checkboxText__box">
                    <input
                        id={`${name}-checkboxText-${i}-checkbox`}
                        className="adminItemFormGrp__checkboxText__box__checkbox"
                        type="checkbox"
                        name={name}
                        value={choice.value}
                        data-name={choice.choice}
                    />
                    <label 
                        htmlFor={`${name}-checkboxText-${i}-checkbox`}
                        className="adminItemFormGrp__checkboxText__box__label"
                    >
                        { choice.choice }
                    </label>
                    <input
                        id={`${name}-checkboxText-${i}-input`}
                        className="adminItemFormGrp__checkboxText__box__input"
                        type="text"
                        name={choice.value}
                        data-name={choice.choice}
                    />
                </div>
            ))

            content = (
                <div className="adminItemFormGrp__con adminItemFormGrp__con--checkboxText">
                    { options }
                </div>
            )

            break;

        default:
            content = (
                <div className="adminItemFormGrp__con">
                    <input
                        id={`adminItemFormGrp_${name}`}
                        className="adminItemFormGrp__con__text"
                        type={type}
                        name={name}
                        required={required}
                    />
                </div>
            )
            break;
    }

    const errorClass = error && "adminItemFormGrp--error";

    return (
        <div className={`adminItemFormGrp ${errorClass}`}>
            <h2 className="adminItemFormGrp__title">
                { title }
            </h2>
            {content}
            { error && <p className="adminItemFormGrp--error__p">ERROR: { error }</p> }
        </div>
    )
}

export default AdminItemFormGrp;