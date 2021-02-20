import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import { useAuthFunctions } from '../../context/AuthContext';
import { useMessage } from '../../context/MessageContext';

import LoadingSmall from '../loading/LoadingSmall';
import ReglogForm from '../reglog/ReglogForm'
import RegistrationSuccess from './RegistrationSuccess';

const Register = () => {

    const history = useHistory();

    const { register } = useAuthFunctions();
    const { displayMessage } = useMessage();
    
    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
        confirmpassword: '',
    })
    const [regSuccess, setRegSuccess] = useState(false);

    const FORM = [
        {
            key: "reglogformgrp-username",
            label: "Username",
            type: "text",
            error: errors.username
        },
        {
            key: "reglogformgrp-email",
            label: "Email",
            type: "email",
            error: errors.email
        },
        {
            key: "reglogformgrp-password",
            label: "Password",
            type: "password",
            error: errors.password
        },
        {
            key: "reglogformgrp-confirmation",
            label: "Confirm Password",
            type: "password",
            error: errors.confirmpassword
        },
    ]

    function handleSubmit(event) {
        event.preventDefault();

        let data = {
            username: document.querySelector(`#reglog-form-username`).value,
            email: document.querySelector(`#reglog-form-email`).value,
            password: document.querySelector(`#reglog-form-password`).value,
            confirmpassword: document.querySelector(`#reglog-form-confirmpassword`).value,
        }

        setLoading(true);
        
        let isValid = checkValidity(["username", "email", "password", "confirmpassword"]);

        if (isValid) {
            register(data).then(result => {
                if(!result) {
                    setLoading(false);
                    displayMessage({ type: "Error", content: "Username and/or Email already exists."});
                    setSubmitError("Username and/or Email already exists.");
                } else {
                    setRegSuccess(true);
                    setLoading(false);
                    setTimeout(()=>history.push("/login"), 3000);
                }
            })
        } else {
            setLoading(false);
        }
    }

    function checkValidity(fields) {
        
        let isValid = true;

        setErrors({
            username: '',
            email: '',
            password: '',
            confirmpassword: '',
        })

        fields.forEach(field => {
            let input = document.querySelector(`#reglog-form-${field}`).value.trim().match(" ");
            if (input) {
                isValid = false;

                setErrors(prevErrors => ({
                    ...prevErrors,
                    [field]: `Invalid ${field}`
                }))
            }
            if (field === "password" || field === "confirmpassword") {
                let inputPassword = document.querySelector(`#reglog-form-password`).value;
                let inputConfirmation = document.querySelector(`#reglog-form-confirmpassword`).value;

                if (inputPassword !== inputConfirmation) {
                    isValid = false;
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        password: `Password and Confirmation must match.`,
                        confirmpassword: `Password and Confirmation must match.`,
                    }))
                }
            }
        })

        return isValid;
    }

    return (
        <div id="register" className="reglog register">
            <div className="reglog__img">
                <h1 className="reglog__img__h1">
                    ALWAYS
                    WEAR
                    MASK
                </h1>
                <div className="reglog__img__filter" />
            </div>
            {loading
                ? (
                    <LoadingSmall />
                )
                : regSuccess
                    ? (
                        <RegistrationSuccess />
                    )
                    : (
                        <ReglogForm 
                            page="Create an account"
                            forms={FORM}
                            btnLabel="Register"
                            handleSubmit={handleSubmit}
                            submitError={submitError}
                        />
                    )
            }
        </div>
    )
}

export default Register;