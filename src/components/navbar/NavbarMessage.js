import React from 'react'
import { useMessage } from '../../context/MessageContext';



const NavbarMessage = () => {

    const { message, closeMessage } = useMessage();

    const display = message && (
        <div id="navbarMessage" className="navbarMessage">
            <p className="navbarMessage__p">{message.content}</p>
            <button className="navbarMessage__btn" onClick={()=>closeMessage()}>
                <i className="navbarMessage__btn__i fas fa-times"></i>
            </button>
        </div>
    )

    return display;
}

export default NavbarMessage;