import React, { useState } from "react";
import AdminAdd from './adminAdd/AdminAdd';
import AdminEdit from "./adminEdit/AdminEdit";
import AdminMain from './adminMain/AdminMain';
import AdminNav from './adminNav/AdminNav'
import AdminOrders from "./adminOrders/AdminOrders";

const Admin = () => {

    const [currentPage, setCurrentPage] = useState("home");

    const PAGES = {
        home: <AdminMain />,
        additem: <AdminAdd />,
        edititem: <AdminEdit />,
        orders: <AdminOrders />
    }

    const content = PAGES[currentPage];

    return (
        <div id="admin" className="admin">
            <AdminNav 
                key="adminnav"
                setCurrentPage={setCurrentPage}
            />
            <div id="adminCon" className="adminCon">
                { content }
            </div>
        </div>
    )
}

export default Admin;