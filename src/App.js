import React, { useEffect } from "react";
import { Routes, Route, HashRouter  } from "react-router-dom";
import { Cart } from "./components/Cart/Cart";
import CartPage from './components/Pages/CartPage'
import Home from './components/Pages/Home'
import Login from "./components/Pages/Login";
import { Navbar } from "./components/Pages/navigation";
import ProductDetail from "./components/Pages/ProductDetail";
import Shop from "./components/Pages/Shop";
import Signup from "./components/Pages/Signup"
import {login, selectUser} from "./Redux/userSlice"
import { useDispatch, useSelector} from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ForgotPwd from "./components/Pages/ForgotPwd";


const App = () => {
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    
    const cart = Cart()
    const items = cart.getItems()

    useEffect( () => {
        const auth = getAuth()
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user.displayName)
                dispatch(login({email:user.email, uid:user.uid, displayName:user.displayName}))   
            } else {
                return
            }
        })
    },[dispatch])

    return (
        <HashRouter>
        <React.Fragment>
        <Navbar totalItems={cart.totalItems} user={user} />
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
                    getProduct={cart.selectedProduct}/>}
                />
                <Route
                    path="/forgot_pwd"
                    element={<ForgotPwd/>}
                    />
                </Routes>
        </React.Fragment>
        </HashRouter>
    )
}


export default App