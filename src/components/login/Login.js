import React, { useState } from 'react'

import { useAuthFunctions } from '../../context/AuthContext';
import { useMessage } from '../../context/MessageContext';

import LoadingSmall from '../loading/LoadingSmall';
import ReglogForm from '../reglog/ReglogForm'

const Login = () => {

    const { login } = useAuthFunctions();
    const { displayMessage } = useMessage();

    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const [errors, setErrors] = useState({
        username: '',
        password: '',
    })

    const FORMS = [
        {
            key: "reglogformgrp-username",
            label: "Username",
            type: "text",
            error: errors.username
        },
        {
            key: "reglogformgrp-password",
            label: "Password",
            type: "password",
            error: errors.password
        },
    ]

    function handleSubmit(event) {
        event.preventDefault();

        let data = {
            username: document.querySelector(`#reglog-form-username`).value,
            password: document.querySelector(`#reglog-form-password`).value
        }

        setLoading(true);
        
        let isValid = checkValidity(["username", "password"]);

        if (isValid) {
            login(data).then(result => {
                if(!result) {
                    setLoading(false);
                    displayMessage({ type: "Error", content: "Invalid username and/or password."})
                    setSubmitError("Invalid username/password");
                };
            })
        } else {
            setLoading(false);
        }
    }

    function checkValidity(fields) {
        
        let isValid = true;

        setErrors({
            username: '',
            password: '',
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
        })

        return isValid;
    }

    return (
        <div id="login" className="reglog login">
            <div className="reglog__img">
                <h1 className="reglog__img__h1">
                    ALWAYS
                    WEAR
                    MASK
                </h1>
                <div className="reglog__img__filter" />
            </div>
            {loading
                ? <LoadingSmall />
                : (
                    <ReglogForm 
                        page="Welcome back"
                        forms={FORMS}
                        btnLabel="Login"
                        handleSubmit={handleSubmit}
                        name="login"
                        submitError={submitError}
                    />
                )
            }
        </div>
    )
}

export default Login;