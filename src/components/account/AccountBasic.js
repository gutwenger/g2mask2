import React from 'react';
import moment from "moment";

import LoadingSmall from "../loading/LoadingSmall";

const AccountBasicGrp = ({ title, data }) => {
    return(
        <div className="accountBasic__grp">
            <p className="accountBasic__grp__title">{ title }</p>
            <p className="accountBasic__grp__data">{ data }</p>
        </div>
    )
}


const AccountBasic = ({ user }) => {
    console.log(user);

    let display = user
        ? (
            <>
                <AccountBasicGrp
                    key="accountbasicgrp--username"
                    title="Username"
                    data={ user && user.username }
                />
                <AccountBasicGrp
                    key="accountbasicgrp--email"
                    title="Email"
                    data={ user && user.email }
                />
                <AccountBasicGrp
                    key="accountbasicgrp--datejoined"
                    title="Date Joined"
                    data={ user && moment(user.date_joined).format("Do MMMM YYYY") }
                />
            </>
        )
        : (
            <LoadingSmall />
        )

    return (
        <div className="accountBasic">
            { display }
        </div>
    )
}

export default AccountBasic;