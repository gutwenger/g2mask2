import React, { useContext, useState } from "react";
import { SERVER_URL } from "../util/serverVariables";

const AuthContext = React.createContext();
const AuthContextFunctions = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function useAuthFunctions() {
    return useContext(AuthContextFunctions);
}

export const AuthProvider = ({ children }) => {

    const [admin, setAdmin] = useState(false);
    const [user, setUser] = useState(()=>checkAuth());
    
    function checkAuth() {
        // Get user from localStorage
        let prevUser = localStorage.getItem("user");

        // If there's no data, then user is not logged in
        if (!prevUser) return false;

        // If there's data, get AccessToken
        prevUser = JSON.parse(prevUser);

        // If not admin, call checkAdmin function
        if (prevUser.id === 1) checkAdmin();

        return prevUser;
    }

    function checkAdmin() {
        // Get user from localStorage
        let prevUser = localStorage.getItem("user");

        // If there's no data, then user is not logged in
        if (!prevUser) return false;

        // If there's data, parse JSON
        prevUser =  JSON.parse(prevUser);

        // Refresh the accessToken to check if admin is valid
        return fetch(`${SERVER_URL}eshop/token/check_admin/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${prevUser.access}`
            },
        })
        .then(response => response.json())
        .then(result => {
            if (result.detail) {
                logout();
                setAdmin(false);
                return false;
            } else {
                setAdmin(true);
                return true;
            }
        });
    }

    function loginOutTest() {
        setUser(prevUser => !prevUser);
    }

    async function login({username, password}) {
        // Function to login
        return fetch(`${SERVER_URL}eshop/token/`, {
            method: "POST",
            body: JSON.stringify({
                username, 
                password,
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then(response => response.json())
        .then(result => {
            // If login fail, return false, else true
            if (result.detail && result.detail === "No active account found with the given credentials") {
                return false;
            } else {
                localStorage.setItem("user", JSON.stringify(result));
                setUser(result);

                // If user is admin, set Admin
                result.id === 1 && setAdmin(true);

                return true;
            }
        });
    }

    function logout() {
        // Function to logout
        localStorage.removeItem("user");
        localStorage.removeItem("cart");

        setUser({});
        setAdmin(false);
        return;
    }

    function logoutKeepCart() {
        // Function to logout
        localStorage.removeItem("user");
        setUser({});
        return;
    }

    async function register({username, email, password}) {
        // Function to login
        return fetch(`${SERVER_URL}eshop/users/registration/`, {
            method: "POST",
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then(response => response.json())
        .then(result => {
            // If login fail, return false, else true
            if (result.detail) {
                return false;
            } else {
                return true;
            }
        });
    }

    return(
        <AuthContext.Provider value={{ user, admin }}>
            <AuthContextFunctions.Provider value={{
                login, logout, logoutKeepCart, loginOutTest, register
            }}>
                { children }
            </AuthContextFunctions.Provider>
        </AuthContext.Provider>
    )
}