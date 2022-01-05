import { useState } from "react";

export const Cart = () => {
    const  [items, setItems] = useState({})
    let  [totalPrice, settotalPrice] =  useState(0)
    let  [totalItems, settotalItems] = useState(0)
    const [prod, setProd] = useState({})


    let ls_items = localStorage.getItem('cart')
    let parsed_ls_items = JSON.parse(ls_items)


  
      const addToCart = (item, id, quantity=1) => {
          quantity = Number(quantity)
         if (!Object.keys(items).includes(id)) {
             items[id] = {item: item, quantity: 0, price: 0}
         } 

        let cartItem = items[id]
        cartItem.quantity += quantity;
        settotalItems(totalItems += quantity)
        cartItem.price = cartItem.item.price * cartItem.quantity;
        settotalPrice(totalPrice += cartItem.item.price)
        setItems(items) 
        localStorage.setItem('cart', JSON.stringify(items))
        localStorage.setItem("total price", JSON.stringify(totalPrice))
        localStorage.setItem("total items", JSON.stringify(totalItems))
         
      };
  
      const removeFromCart = (e, id) => {
          settotalItems(totalItems -= items[id].quantity)
          settotalPrice(totalPrice -= items[id].price)
          delete items[id]
          localStorage.setItem("total price",JSON.stringify(totalPrice))
          localStorage.setItem("total items", JSON.stringify(totalItems))
          localStorage.setItem("cart", JSON.stringify(items))
          e.preventDefault()
      }
    
      const getProduct = (product) => {
        if(product){
            setProd(product)
        }else{
            console.log('cannot get product')
        }
        console.log(product)
         return prod
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
        localStorage.setItem("total price",JSON.stringify(totalPrice))
        localStorage.setItem("total items", JSON.stringify(totalItems))
        localStorage.setItem("cart", JSON.stringify(items))
         
    }

    const getItems = () => {
        let cartArr = [];
        let pls = parsed_ls_items
        console.log(pls)
        for (let id in pls){
            cartArr.push(pls[id]);
        }
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
            prod
        }
}





    
