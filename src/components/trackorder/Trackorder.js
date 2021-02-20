import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import validateUUID from "uuid-validate";

import { useAuth } from "../../context/AuthContext";

import { getOrder } from "../../util/getOrder";

import LoadingSmall from "../loading/LoadingSmall";
import TrackorderForm from './TrackorderForm';

const Trackorder = () => {

    const history = useHistory();

    const { user } = useAuth();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const display = loading
        ? (
            <LoadingSmall />
        )
        : (
            <TrackorderForm 
                key="trackorderform"
                handleSubmit={handleSubmit}
            />
        );
    
    const displayError = error && (
        <p className="trackorder__error">
            Error: {error}
        </p>
    )

    function handleSubmit(event) {        
        event.preventDefault();
        setLoading(true);

        let uuid = event.target.trackorderInput.value;
        let isValid = validateUUID(uuid, 4);
        console.log(uuid);
        if (isValid) {
            getOrder({ uuid, user })
            .then(result => {
                console.log(result);
                // If error
                if (result.detail) {
                    setError(result.detail);
                    setLoading(false);
                // If found
                } else {
                    setError("");
                    setLoading(false);
                    /*
                    history.push({
                        pathname: `/order/${uuid}`,
                        state: { item: result }
                    });
                    */

                    history.push(`/order/${uuid}`)
                }
            })
        } else {
            setLoading(false);
            setError("Invalid order number.");
        }
    }

    return (
        <div id="trackorder" className="trackorder">
            <h1 className="trackorder__h1">
                TRACK ORDER
            </h1>
            { display }
            { displayError }
        </div>
    )
}

export default Trackorder;