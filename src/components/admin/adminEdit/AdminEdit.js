import React, { useState } from 'react'

import { useAuth } from "../../../context/AuthContext";
import { useItems } from "../../../context/ItemContext";

import { SERVER_URL } from "../../../util/serverVariables";
import { ADMIN_FORM_FIELDS } from "../../../data/adminForm";
import LoadingLarge from '../../loading/LoadingLarge';
import AdminItemForm from '../adminItemForm/AdminItemForm';
import AdminEditSearch from './AdminEditSearch';

const AdminEdit = () => {

    const { user } = useAuth();
    const { items } = useItems();

    const [item, setItem] = useState(false);
    const [currentPage, setCurrentPage] = useState("search");

    function updateItem({ data }) {
        console.log("UPDATE");
        console.log(data);

        fetch(`${SERVER_URL}eshop/masks/update/${item.id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${user.access}`
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            console.log(result);
        })


        setCurrentPage("form");
    }

    function searchItem({ itemID }) {
        console.log(itemID);
        console.log(items.items);
        let result = items.items.filter(item => item.id === itemID);
        setItem(result[0]);
        setCurrentPage("form");
    }

    const DISPLAY = {
        loading: <LoadingLarge />,
        form: (
                <AdminItemForm
                key="adminitemform"
                fields={ADMIN_FORM_FIELDS.createItem}
                setCurrentPage={setCurrentPage}
                createEdit={updateItem}
                editItem={item}
            />
        ),
        search: (
            <AdminEditSearch 
                key="admineditsearch"
                searchItem={searchItem}
                setCurrentPage={setCurrentPage}
            />
        )
    }

    return (
        <div id="adminEdit" className="adminEdit">
            <h1 className="adminEdit__h1">
                EDIT ITEM
            </h1>
            { DISPLAY[currentPage] }
        </div>
    )
}

export default AdminEdit;