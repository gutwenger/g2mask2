import React from 'react';

import { useItems } from "../../../context/ItemContext";

import AdminMainItemsCard from "./AdminMainItemsCard";

const AdminMainItems = () => {

    const { items } = useItems();

    return (
        <div className="adminMainItems">
            <div className="adminMainItems__icon">
                <i className="adminMainItems__icon__i fas fa-chess-pawn"></i>
            </div>
            <div className="adminMainItems__details">
                <AdminMainItemsCard
                    key="adminmainitemscard-totalitems"
                    title="Total Items"
                    data={items.items.length}
                />
                <AdminMainItemsCard
                    key="adminmainitemscard-totalsale"
                    title="On-sale"
                    data={items.items.filter(item => item.is_sale).length}
                />
            </div>
        </div>
    )
}

export default AdminMainItems;