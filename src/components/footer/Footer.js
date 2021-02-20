import React from 'react';
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div id="footer" className="footer">
            <div id="footerLogo" className="footerLogo">
                <Link to="/" className="footerLogo__link">
                    G2MASK
                </Link>
            </div>
            <div id="footernav" className="footernav">
                <Link to="/about" className="footernav__link">ABOUT</Link>
                <Link to="/about" className="footernav__link">CAREER</Link>
                <Link to="/about" className="footernav__link">CONTACT</Link>
            </div>
            <div id="footerFollow" className="footerFollow">
                <h2 className="footerFollow__h2">FOLLOW US ON:</h2>
                <div id="footerFollow__div" className="footerFollow__div">
                    <i className="footerFollow__div__i fab fa-facebook-f"></i>
                    <i className="footerFollow__div__i fab fa-twitter"></i>
                    <i className="footerFollow__div__i fab fa-instagram"></i>
                </div>
            </div>
        </div>
    )
}

export default Footer;