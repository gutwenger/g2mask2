import React from 'react'

import { Redirect, Route, Switch } from "react-router-dom";

import Main from "../../components/main/Main";
import About from "../../components/about/About";
import Item from "../../components/item/Item";
import Trackorder from "../../components/trackorder/Trackorder";
import Order from "../../components/order/Order";
import Cart from '../cart/Cart';
import Account from "../../components/account/Account";
import Register from "../../components/register/Register";
import Login from "../../components/login/Login";
import Error from "../../components/error/Error";

import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import Checkout from '../checkout/Checkout';
import Admin from '../admin/Admin';

const Content = () => {

    const { user, admin } = useAuth();
    const { cart } = useCart();

    const cartPage = (
        <Route exact path="/g2mask2/cart">
            {cart.length === 0 ? <Redirect to="/g2mask2/" /> : <Cart />}
        </Route>
    )

    const checkout = (
        <Route exact path="/g2mask2/checkout">
            {cart.length === 0 ? <Redirect to="/g2mask2/" /> : <Checkout />}
        </Route>
    )

    const register = (
        <Route exact path="/g2mask2/register">
            {user ? <Redirect to="/g2mask2/" /> : <Register />}
        </Route>
    )

    const login = (
        <Route exact path="/g2mask2/login">
            {user ? <Redirect to="/g2mask2/" /> : <Login />}
        </Route>
    )

    const account = (
        <Route exact path="/g2mask2/account">
            {user ? <Account /> : <Redirect to="/g2mask2/" />}
        </Route>
    )

    const adminPage = (
        <Route exact path="/g2mask2/admin">
            {admin ? <Admin /> : <Redirect to="/g2mask2/" />}
        </Route>
    )

    return (
        <div className="main-con">
            <Switch>
                <Route path="/g2mask2/" component={Main} exact />
                <Route path="/g2mask2/about" component={About} />
                <Route path="/g2mask2/item/:itemId" component={Item} />
                <Route path="/g2mask2/order" component={Trackorder} exact />
                <Route path="/g2mask2/trackorder" component={Trackorder} exact />
                <Route path="/g2mask2/order/:orderID" component={Order} />
                <Route path="/g2mask2/cart" component={Cart} exact />
                { cartPage }
                { checkout }
                { register }
                { login }
                { account }
                { adminPage }
                <Route path="/g2mask2/*" component={Error} />
            </Switch>
        </div>
    )
}

export default Content;