import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import { useAuth } from "../../../context/AuthContext";
import { useItems } from "../../../context/ItemContext";

import { ADMIN_FORM_FIELDS } from "../../../data/adminForm";
import { SERVER_URL } from "../../../util/serverVariables";
import LoadingLarge from '../../loading/LoadingLarge';

import AdminItemForm from '../adminItemForm/AdminItemForm';

const AdminAdd = () => {

    const history = useHistory();
    const { user } = useAuth();
    const { refreshItems } = useItems();
    const [currentPage, setCurrentPage] = useState("form");

    function createItem({ data }) {
        fetch(`${SERVER_URL}eshop/masks/create/`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${user.access}`
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            console.log(result);
            if (result.details) {
                setCurrentPage("form");
                return;
            } else {
                let newID = result.mask.id
                refreshItems().then(result => {
                    if (!result) return;
                    history.push(`/item/${newID}`);
                })
            }
        })
    }

    const DISPLAY = {
        loading: <LoadingLarge />,
        form: (
                <AdminItemForm
                key="adminitemform"
                fields={ADMIN_FORM_FIELDS.createItem}
                createEdit={createItem}
                setCurrentPage={setCurrentPage}
            />
        )
    }

    return (
        <div id="adminAdd" className="adminAdd">
            <h1 className="adminAdd__h1">
                CREATE A NEW ITEM
            </h1>
            { DISPLAY[currentPage] }
        </div>
    )
}

export default AdminAdd;