import React, { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from "react-router-dom";

import { useAuth, useAuthFunctions } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

import NavbarLogo from "./NavbarLogo";
import NavbarMessage from './NavbarMessage';

const NavbarLink = ({ path, pageName, closeNavbar }) => {

    const { getCartTotalItems } = useCart();

    let cartNumbers = (pageName === "CART" && getCartTotalItems() > 0) && (
        <p className="navbarcon__ul__li__link__cartNumber">{getCartTotalItems()}</p>
    );

    let cartClassName = (pageName === "CART" && getCartTotalItems() > 0) && "navbarcon__ul__li__link--cart";

    let normal = (
        <Link to={path} className={`navbarcon__ul__li__link ${cartClassName}`} onClick={()=>closeNavbar(false)}>
            {pageName}
            {cartNumbers}
        </Link>
    )

    return(
        <li className="navbarcon__ul__li">
            { normal }
        </li>
    )
}

const NavbarLogout = ({ closeNavbar }) => {

    const location = useLocation();
    const history = useHistory();

    const { logout } = useAuthFunctions();
    const { resetCart } = useCart();


    function handleClick() {
        logout();
        closeNavbar();
        resetCart();
        history.push("/g2mask2/");
        history.replace("/g2mask2/")
        window.location.reload();
    }

    return (
        <li className="navbarcon__ul__li">
            <button className="navbarcon__ul__li__logout" onClick={()=>handleClick()}>LOGOUT</button>
        </li>
    )
}

const Navbar = () => {

    const { user, admin } = useAuth();
    const [displayNavbar, setDisplayNavbar] = useState(()=>checkDisplayNavbar());

    useEffect(()=>{
        window.addEventListener('resize', () => setDisplayNavbar(checkDisplayNavbar()));
    })

    function checkDisplayNavbar() {
        let windowInnerWidth = window.innerWidth;

        if (windowInnerWidth > 600) {
            return true;
        } else {
            return false;
        }
    }

    function closeNavbar() {
        if (checkDisplayNavbar()) return;
        setDisplayNavbar(false);
    }

    const navbar = displayNavbar && (
        <nav id="navbarcon" className="navbarcon">
            <ul id="navbarcon__ul" className="navbarcon__ul">
                <NavbarLink key="navbarlink-about" path="/about" pageName="ABOUT" closeNavbar={closeNavbar} />
                <NavbarLink key="navbarlink-home" path="/" pageName="SHOP" closeNavbar={closeNavbar} />
                <NavbarLink key="navbarlink-trackorder" path="/trackorder" pageName="TRACK ORDER" closeNavbar={closeNavbar} />
                <NavbarLink key="navbarlink-cart" path="/cart" pageName="CART" closeNavbar={closeNavbar} />
                {!user && <NavbarLink key="navbarlink-register" path="/register" pageName="REGISTER" closeNavbar={closeNavbar} />}
                {!user && <NavbarLink key="navbarlink-login" path="/login" pageName="LOGIN" closeNavbar={closeNavbar} />}
                {user && <NavbarLink key="navbarlink-account" path="/account" pageName="ACCOUNT" closeNavbar={closeNavbar} />}
                {user && <NavbarLogout key="navbarlink-logout" closeNavbar={closeNavbar} />}
                {admin && <NavbarLink key="navbarlink-admin" path="/admin" pageName="ADMIN" closeNavbar={closeNavbar} />}
            </ul>
        </nav>
    )

    return (
        <div id="navbar" className="navbar">
            <NavbarLogo />
            <button 
                className={`navbar__btn ${displayNavbar ? "navbar__btn--close" : "navbar__btn--open"}`}
                onClick={()=>setDisplayNavbar(prevState => !prevState)}
            >
                <i className={`navbar__btn__i ${displayNavbar ? "fas fa-times" : "fas fa-bars"}`} />
            </button>
            { navbar }
            <NavbarMessage />
        </div>
    )
}

export default Navbar;