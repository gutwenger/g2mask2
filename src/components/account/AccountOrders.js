import React from 'react';
import { Link } from "react-router-dom";
import moment from "moment";

import LoadingSmall from '../loading/LoadingSmall';

const AccountOrderCard = ({ order }) => {
    return (
        <Link to={`/order/${order.uuid}`}>
            <div className="accountOrderCard">
                <div className="accountOrderCard__data">
                    <p className="accountOrderCard__date">
                        { moment(order.timestamp_created).format("Do MMMM YYYY") }
                    </p>
                    <p className="accountOrderCard__ordernum">
                        ORDER NO.
                    </p>
                    <p className="accountOrderCard__orderid">
                        { order.uuid }
                    </p>
                </div>
                <div className="accountOrderCard__info">
                    <p className="accountOrderCard__status">
                        { order.status }
                    </p>
                </div>
            </div>
        </Link>
    )
}

const AccountOrders = ({ user }) => {

    let display = user
        ? user.orders.length > 0
            ? (
                <div className="accountOrders__con">
                    { user.orders.map((order, i) => (
                        <AccountOrderCard
                            key={`accountordercard-${i}`}
                            order={order}
                        />
                    )) }
                </div>
            )
            : (
                <div className="accountOrders__empty">
                    SHOP NOW!
                </div>
            )
        : (
            <LoadingSmall />
        )

    return (
        <div className="accountOrders">
            <h2 className="accountOrders__h2">
                ORDERS
            </h2>
            { display }
        </div>
    )
}

export default AccountOrders;
