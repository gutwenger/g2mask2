import React, { useContext, useState } from "react";

const MessageContext = React.createContext();

export function useMessage() {
    return useContext(MessageContext);
}

export const MessageProvider = ({ children }) => {

    const [message, setMessage] = useState(false);

    function displayMessage({ type, content }) {
        setMessage({ type, content })
    }

    function closeMessage() {
        setMessage(false)
    }
    
    return(
        <MessageContext.Provider value={{ message, displayMessage, closeMessage }}>
            { children }
        </MessageContext.Provider>
    )
}