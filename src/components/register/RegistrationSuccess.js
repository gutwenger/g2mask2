import React from 'react'

const RegistrationSuccess = () => {
    return (
        <div id="registrationSuccess" className="registrationSuccess">
            <h1 className="registrationSuccess__h1">
                Registration Successful
            </h1>
            <i className="registrationSuccess__i far fa-check-circle"></i>
            <p className="registrationSuccess__p">
                Thank you for joining us!
            </p>
            <p className="registrationSuccess__p">
                You will be redirected to LOGIN shortly...
            </p>
        </div>
    )
}

export default RegistrationSuccess;