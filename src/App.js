import './App.css';

import { BrowserRouter as Router, HashRouter } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ItemProvider } from "./context/ItemContext";
import { DisplayItemsProvider } from "./context/DisplayItemsContext";
import { MessageProvider } from "./context/MessageContext";
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Content from './components/content/Content';

const App = () => {

    return (
        <div className="App">
            <AuthProvider>
                <ItemProvider>
                    <DisplayItemsProvider>
                        <CartProvider>
                            <MessageProvider>
                                <HashRouter basename="/g2mask">
                                    <Navbar />
                                    <Content />
                                    <Footer />
                                </HashRouter>
                            </MessageProvider>
                        </CartProvider>
                    </DisplayItemsProvider>
                </ItemProvider>
            </AuthProvider>
        </div>
    );


}

export default App;
