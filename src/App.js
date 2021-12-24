import React from "react";
import { BrowserRouter, Routes, Route  } from "react-router-dom";
import { Cart } from "./components/Cart/Cart";
import CartPage from './components/Pages/CartPage'
import Home from './components/Pages/Home'
import { Navbar } from "./components/Pages/navigation";
import Shop from "./components/Pages/Shop";

const App = () => {
    const cart = Cart()
    return (
        <BrowserRouter>
        <React.Fragment>
        <Navbar totalItems={cart.totalItems} />
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/shop" element={<Shop addToCart={cart.addToCart}/>}/>
                <Route path="/cart" element={<CartPage/>}/>
                </Routes>
        </React.Fragment>
        </BrowserRouter>
    )
}

export default App