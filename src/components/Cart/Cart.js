import { useState } from "react";

export const Cart = () => {
    const cart = JSON.parse(localStorage.getItem('cart'))
    const cart_total = Number(localStorage.getItem('total price'))
    const cart_items = Number(localStorage.getItem('total items'))
    const selected_product = JSON.parse(localStorage.getItem('product'))
    const [items, setItems] = useState(cart? cart: {})
    let  [totalPrice, settotalPrice] =  useState(cart_total? cart_total: 0)
    let  [totalItems, settotalItems] = useState(cart_items? cart_items: 0)
    const [ selectedProduct, setSelectedProduct] = useState(selected_product? selected_product: 0)

    // get cart items from local storage
    const getLsItems = () => {
        let ls_items = JSON.parse((localStorage.getItem('cart')))
        console.log("second",ls_items)
        setItems(ls_items)
        console.log("third", items)
    }

    // add cart items to local storage
    const addToLocalStorage = () => {
        localStorage.setItem("total price",JSON.stringify(totalPrice))
        localStorage.setItem("total items", JSON.stringify(totalItems))
        localStorage.setItem("cart", JSON.stringify(items))
        }

      const addToCart = (item, id, quantity=1) => {
        quantity = Number(quantity)
         if (!Object.keys(items).includes(id)) {
             console.log('t/f', Object.keys(items))
             items[id] = {item: item, quantity: 0, price: 0}
         } 
         
        items[id].quantity += quantity;
        settotalItems(totalItems += quantity)
        items[id].price = items[id].item.price * items[id].quantity;
        settotalPrice(totalPrice += items[id].item.price)
        addToLocalStorage()
        getLsItems()
         
      };

     
  
      const removeFromCart = (e, id) => {
          settotalItems(totalItems -= items[id].quantity)
          settotalPrice(totalPrice -= items[id].price)
          delete items[id]
          addToLocalStorage()
          getLsItems()
          e.preventDefault()
      }
    
      const getProduct = (product) => {
        if(product){
            setSelectedProduct(product)
            localStorage.setItem('product', JSON.stringify(product))
        }else{
            console.log('cannot get product')
        }
        console.log("getProduct",product)
         return selectedProduct
    }

    const changeQunatity = (id, action) => {
        const quant = items[id].quantity
       
        if (action === "subtract" && quant > 1){
            items[id].quantity -= 1
            items[id].price -= items[id].item.price
            setItems(items)
            settotalItems(totalItems -= 1)
            settotalPrice(totalPrice -= items[id].item.price)
        }

        else if (action === "add" && quant > 0){
            console.log("added")
            items[id].quantity += 1
            items[id].price += items[id].item.price
            setItems(items)
            settotalItems(totalItems += 1)
            settotalPrice(totalPrice += items[id].item.price)
        }
        addToLocalStorage()
        getLsItems()
    }

    const getItems = () => {
        let cartArr = [];
        const get_cart = localStorage.getItem('cart')
        const cart_items = JSON.parse(get_cart)
        for (let id in cart_items){
            cartArr.push(cart_items[id])
        }
        console.log("get items",cartArr)
        return cartArr
    }

    return {
            changeQunatity,
            items, 
            totalItems, 
            totalPrice, 
            addToCart, 
            getItems, 
            removeFromCart, 
            getProduct, 
            selectedProduct
        }
}





    
