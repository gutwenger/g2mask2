import './App.css';

import { BrowserRouter as Router } from "react-router-dom";

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
                                <Router>
                                    <Navbar />
                                    <Content />
                                    <Footer />
                                </Router>
                            </MessageProvider>
                        </CartProvider>
                    </DisplayItemsProvider>
                </ItemProvider>
            </AuthProvider>
        </div>
    );


}

export default App;
