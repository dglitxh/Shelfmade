import React, { useEffect } from "react";
import CartPage from './components/Pages/CartPage'
import Home from './components/Pages/Home'
import Login from "./components/Pages/Login";
import ProductDetail from "./components/Pages/ProductDetail";
import Shop from "./components/Pages/Shop";
import Signup from "./components/Pages/Signup"
import ForgotPwd from "./components/Pages/ForgotPwd";
import { Cart } from "./components/Cart/Cart";
import { Navbar } from "./components/Pages/navigation";
import {login, selectUser} from "./Redux/userSlice"
import { useDispatch, useSelector} from "react-redux";
import { Routes, Route, HashRouter, Navigate  } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";



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
                    element={!user ? <Login/> : <Navigate to={"/cart"} replace/>}
                />
                <Route
                    path="/signup"
                    element={!user ? <Signup/> : <Navigate to={"/cart"} replace/>}
                />
                <Route
                    path="/cart" element={<CartPage
                    removeFromCart={cart.removeFromCart}
                    changeQuantity={cart.changeQunatity}
                    totalPrice={cart.totalPrice}
                    user={user}
                    items={items}/>}
                />
                <Route
                    path="/details"
                    element={<ProductDetail
                    addToCart={cart.addToCart}
                    getProduct={cart.selectedProduct}/>}
                />
                <Route
                    path="/forgot"
                    element={<ForgotPwd/>}
                    />
                </Routes>
        </React.Fragment>
        </HashRouter>
    )
}


export default App
