import React, { useEffect, useState, useRef } from 'react'
import AdminItemFormGrp from './AdminItemFormGrp';

const AdminItemForm = ({ fields, createEdit, setCurrentPage, editItem }) => {

    const formRef = useRef();

    const [items, setItems] = useState(fields);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!editItem) return;
        populateFormData();
    })


    function handleSubmit(event) {
        event.preventDefault();

        setCurrentPage("loading");

        let isValid = true;
        
        items.forEach((item) => {
            if (item.fields) {
                item.fields.forEach(field => {
                    if (!checkForm({ fieldName: item.name, name: field.name, type: item.type })) isValid = false;
                })
            } else {
                if (!checkForm({ name: item.name, type: item.type })) isValid = false;
            }
        })
        
        if (!isValid) window.scrollTo(0, 0);

        let data = {};

        items.forEach((item) => {
            if (item.fields) {
                item.fields.forEach(field => {
                    data = {
                        ...data,
                        ...getData({ fieldName: item.name, name: field.name, type: item.type })
                    }
                })
            } else {
                data = {
                    ...data,
                    ...getData({ name: item.name, type: item.type })
                }
            }
        })

        console.log(data);

        createEdit({ data });
    }

    function checkForm({ fieldName, name, type }) {
        const FORM = document.querySelector("#adminItemForm");
        let fieldKey = fieldName ? fieldName : name;

        let errorMessage = '';
        let input = FORM[name];
        let isValid = true;
        let newItems = items;


        if (type === "text" || type === "tel" || type === "url") {
            
            if (name === "other_brand") return true;

            // If no input or input is an empty string
            if (!input.value || input.value.trim("") === "") {
                isValid = false;
                errorMessage = "This field must not be left empty."
            }
        
        } else if (type === "select") {
            
            if (input.value === "default") {
                isValid = false;
                errorMessage = "Please select ONE option."
            }

            if (name === "brand" && input.value === "others") {
                input = FORM.other_brand.value;
                if (!input || input.trim() === "") {
                    isValid = false;
                    fieldKey = "other_brand";
                    errorMessage = "An alternative brand must be provided or select an existing brand."
                }
            }

        } else if (type === "checkbox") {

            // Iterate through each input to check if any of them is checked
            let selected = false;
            input.forEach((item) => {
                if (item.checked) selected = true;
            })

            // If nothing is selected, this section is invalid
            if (!selected) {
                isValid = false;
                errorMessage = "Please select AT LEAST ONE option."
            };

        } else if (name === "variations") {
            let selected = false;

            // Iterate through each input to check if any of them is selected and provided with a value
            input.forEach(item => {

                // If any item is selected and a value is given, then it is a valid input
                if (item.checked && FORM[item.value].value.trim() !== "") selected = true;

                // If nothing is selected or any item selected is not provided with a value, this section is invalid
                if (!selected) {
                    isValid = false;
                    errorMessage = "Please select AT LEAST ONE option and provide it with a quantity greater than 0."
                }

            })
        } else if (type === "radio") {

            // Iterate through each input to check if any of them is checked
            let selected = false;
            input.forEach((item) => {
                if (item.checked) selected = true;
            })

            // If nothing is selected, this section is invalid
            if (!selected) {
                isValid = false;
                errorMessage = "Please select ONE option."
            };

        } else if (type === "text-text") {

            // Iterate through each input to check if any of them is empty
            let valid = input.value.trim() > 0;

            // If nothing is selected, this section is invalid
            if (!valid) {
                isValid = false;
                errorMessage = "Please fill out all blanks of this section."
            };
        }

        // If this section is INVALID
        if (!isValid) {

            setItems(newItems);
            setErrors(prevErrors => ({
                ...prevErrors,
                [fieldKey]: errorMessage
            }))
            
        } else {

            // Delete corrected errors
            if (errors[fieldKey]) {
                setErrors(prevErrors => delete prevErrors[fieldKey]);
            }

        }
        
        return isValid;
    }

    function getData({ fieldName, name, type }) {
        const FORM = document.querySelector("#adminItemForm");
        let fieldKey = fieldName ? fieldName : name;

        let input = FORM[name];
        let data = {};


        if (type === "text" || type === "tel" || type === "url") {
            
            if (name === "other_brand") return true;

            data[fieldKey] = input.value;
        
        } else if (type === "select") {
            
            if (name === "brand" && input.value === "others") {
                data[fieldKey] = FORM.other_brand.value;
            } else {
                data[fieldKey] = Number(input.value);
            }

        } else if (type === "checkbox") {

            let result = [];

            input.forEach((item) => {
                if (item.checked) result.push(Number(item.value));
            })

            data[fieldKey] = result;

        } else if (name === "variations") {
            
            let result = [];

            input.forEach(item => {

                if (item.checked && FORM[item.value].value.trim() !== "") {
                    result.push({
                        size: item.value,
                        inventory: FORM[item.value].value
                    })
                };

            })

            data[fieldKey] = result;

        } else if (type === "radio") {

            let result;

            input.forEach((item) => {
                if (item.checked) result = item.value;
            })

            data[fieldKey] = result;

        } else if (type === "text-text") {

            data[`price_${name}`] = input.value.trim();

        }
        
        return data;
    }

    function populateFormData() {
        const FORM = formRef.current;
        
        for (const key in editItem) {
            const SPECIAL = {
                SKIP: ["id", "reviews", "timestamp_created", "timestamp_updated"],
                SELECT: ["mask_type", "brand", "origin"],
                CHECKBOX: ["protections"],
                OTHERS: ["price_current", "price_original"],
                VARIATIONS: ["variations"]
            }

            if (SPECIAL.SKIP.includes(key)) continue;
                
            if (SPECIAL.SELECT.includes(key)) {
                FORM[key].value = editItem[key].id;
            } else if (SPECIAL.CHECKBOX.includes(key)) {
                if (key === "protections") {
                    FORM.protection.forEach(item => {
                        if (editItem[key].includes(item.dataset.name.toUpperCase())) {
                            item.checked = true;
                        }
                    })
                }
            } else if (SPECIAL.OTHERS.includes(key)) {
                FORM[key.slice(6)].value = editItem[key];
            } else if (SPECIAL.VARIATIONS.includes(key)) {
                editItem[key].forEach(item => {
                    FORM.variations.forEach(formItem => {
                        if (formItem.dataset.name === item.size) {
                            formItem.checked = true;
                            FORM[formItem.value].value = item.inventory;
                        }
                    })
                })
            } else {
                FORM[key].value = editItem[key];
            }
        }
    }

    return (
        <form id="adminItemForm" className="adminItemForm" ref={formRef} onSubmit={(event)=>handleSubmit(event)}>
            {items && items.map((item, i) => (
                <AdminItemFormGrp
                    key={`adminItemForm-${i}`}
                    item={item}
                    error={errors[item.name]}
                />
            ))}
            <button className="adminItemForm__btn standardBtn--2">Submit</button>
        </form>
    )
}

export default AdminItemForm;