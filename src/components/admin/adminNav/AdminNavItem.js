import React from 'react'

const AdminNavItem = ({ icon, page, link, setCurrentPage }) => {
    return (
        <button className="adminNav__btn" onClick={()=>setCurrentPage(link)}>
            <i className={`adminNav__btn__i ${icon}`}></i>
            <p className="adminNav__btn__p">{page}</p>
        </button>
    )
}

export default AdminNavItem;