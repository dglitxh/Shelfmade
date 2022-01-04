import React from "react";
import { BrowserRouter, Routes, Route  } from "react-router-dom";
import { Cart } from "./components/Cart/Cart";
import getAll from "./components/Firebase/firebase";
import CartPage from './components/Pages/CartPage'
import Home from './components/Pages/Home'
import Login from "../components/Pages/Login";
import { Navbar } from "./components/Pages/navigation";
import ProductDetail from "./components/Pages/ProductDetail";
import Shop from "./components/Pages/Shop";
import Signup from "../components/Pages/Signup"




const App = () => {
    const cart = Cart()
    const items = cart.getItems()
    return (
        <BrowserRouter>
        <React.Fragment>
        <Navbar totalItems={cart.totalItems} />
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route 
                    path="/shop" 
                    element={<Shop 
                    addToCart={cart.addToCart} 
                    getProduct={cart.getProduct}/>}
                />
                <Route 
                    path="/login" 
                    element={<Login
                   />}
                />
                <Route 
                    path="/signup" 
                    element={<Signup
                   />}
                />
                <Route 
                    path="/cart" element={<CartPage 
                    removeFromCart={cart.removeFromCart} 
                    changeQuantity={cart.changeQunatity} 
                    totalPrice={cart.totalPrice} 
                    items={items}/>}
                />
                <Route 
                    path="/details" 
                    element={<ProductDetail 
                    addToCart={cart.addToCart} 
                    getProduct={cart.prod}/>}
                />
                </Routes>
        </React.Fragment>
        </BrowserRouter>
    )
}

export default App