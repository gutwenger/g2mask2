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
        <Route exact path="/cart">
            {cart.length === 0 ? <Redirect to="/" /> : <Cart />}
        </Route>
    )

    const checkout = (
        <Route exact path="/checkout">
            {cart.length === 0 ? <Redirect to="/" /> : <Checkout />}
        </Route>
    )

    const register = (
        <Route exact path="/register">
            {user ? <Redirect to="/" /> : <Register />}
        </Route>
    )

    const login = (
        <Route exact path="/login">
            {user ? <Redirect to="/" /> : <Login />}
        </Route>
    )

    const account = (
        <Route exact path="/account">
            {user ? <Account /> : <Redirect to="/" />}
        </Route>
    )

    const adminPage = (
        <Route exact path="/admin">
            {admin ? <Admin /> : <Redirect to="/" />}
        </Route>
    )

    return (
        <div className="main-con">
            <Switch>
                <Route path="/" component={Main} exact />
                <Route path="/about" component={About} />
                <Route path="/item/:itemId" component={Item} />
                <Route path="/order" component={Trackorder} exact />
                <Route path="/trackorder" component={Trackorder} exact />
                <Route path="/order/:orderID" component={Order} />
                <Route path="/cart" component={Cart} exact />
                { cartPage }
                { checkout }
                { register }
                { login }
                { account }
                { adminPage }
                <Route path="/*" component={Error} />
            </Switch>
        </div>
    )
}

export default Content;