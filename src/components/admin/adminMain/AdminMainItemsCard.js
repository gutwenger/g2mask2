import React from 'react'

const AdminMainItemsCard = ({ title, data }) => {
    return (
        <div id="adminMainItemsCard" className="adminMainItemsCard">
            <p className="adminMainItemsCard__title">
                {title}
            </p>
            <p className="adminMainItemsCard__data">
                {data}
            </p>
        </div>
    )
}

export default AdminMainItemsCard;