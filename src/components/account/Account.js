import React, { useEffect, useState } from 'react';

import { useAuth } from "../../context/AuthContext";
import AccountBasic from './AccountBasic';
import { SERVER_URL } from "../../util/serverVariables";
import AccountOrders from './AccountOrders';

const Account = () => {

    const { user } = useAuth();

    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        function getUserDetails() {
            fetch(`${SERVER_URL}eshop/users/details/${user.id}/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.access}`
                },
            })
            .then(response => response.json())
            .then(result => {
                setUserDetails(result);
            });
        }

        getUserDetails();
    }, [user]);

    return (
        <div id="account" className="account">
            <h1 className="account__h1">ACCOUNT</h1>
            <div className="account__con">
                <AccountBasic
                    key="accountbasic"
                    user={ userDetails }
                />
                <AccountOrders
                    key="accountorders"
                    user={ userDetails }
                />
            </div>
        </div>
    )
}

export default Account;