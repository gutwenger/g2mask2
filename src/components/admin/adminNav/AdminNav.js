import React from 'react';
import AdminNavItem from './AdminNavItem';

const AdminNav = ({ setCurrentPage }) => {
    return (
        <div id="adminNav" className="adminNav">
            <AdminNavItem
                key="adminnavitem-home"
                icon="fas fa-home"
                page="HOME"
                link="home"
                setCurrentPage={setCurrentPage}
            />
            <AdminNavItem
                key="adminnavitem-additem"
                icon="fas fa-plus"
                page="ADD ITEM"
                link="additem"
                setCurrentPage={setCurrentPage}
            />
            <AdminNavItem
                key="adminnavitem-edititem"
                icon="fas fa-pencil-alt"
                page="EDIT ITEM"
                link="edititem"
                setCurrentPage={setCurrentPage}
            />
            <AdminNavItem
                key="adminnavitem-orders"
                icon="fas fa-scroll"
                page="ORDERS"
                link="orders"
                setCurrentPage={setCurrentPage}
            />
        </div>
    )
}

export default AdminNav;
