import React, { useRef } from 'react'

const AdminEditSearch = ({ searchItem, setCurrentPage }) => {

    const itemIDRef = useRef();

    function handleSearch(event) {
        event.preventDefault();
        setCurrentPage("loading");
        searchItem({ itemID: Number(itemIDRef.current.value) });
    }

    return (
        <form id="adminEditSearch" className="adminEditSearch" onSubmit={(event)=>handleSearch(event)}>
            <label
                htmlFor="adminEditSearch__input"
                className="adminEditSearch__label"
            >
                Please entre an item number:
            </label>
            <input
                id="adminEditSearch__input"
                className="adminEditSearch__input"
                type="tel"
                ref={itemIDRef}
                required
            />
            <button type="submit" className="adminEditSearch__btn standardBtn--2">Search</button>
        </form>
    )
}

export default AdminEditSearch;