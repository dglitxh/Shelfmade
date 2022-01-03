import { useState } from "react";

export const Cart = () => {
    let  [items, setItems] = useState({})
    let  [totalPrice, settotalPrice] =  useState(0)
    let  [totalItems, settotalItems] = useState(0)
    let [prod, setProd] = useState({})
  
      const addToCart = (item, id, quantity=1) => {
          quantity = Number(quantity)
         if (!Object.keys(items).includes(id)) {
             items[id] = {item: item, quantity: 0, price: 0}
         } 

        let cartItem = items[id]
        cartItem.quantity += quantity;
        totalItems += quantity
        cartItem.price = cartItem.item.price * cartItem.quantity;
        totalPrice += cartItem.item.price
        settotalItems(totalItems)
        settotalPrice(totalPrice)
        setItems(items) 
        localStorage.setItem('cart', JSON.stringify(items))
        let it = localStorage.getItem('cart')
        console.log(JSON.parse(it))
      };
  
      const removeFromCart = (e, id) => {
          totalItems -= items[id].quantity 
          totalPrice -= items[id].price
          settotalItems(totalItems)
          settotalPrice(totalPrice)
          delete items[id]
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

    const changeQunatity = (item, id, quantity) => {
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
        }
         
    }

    const getItems = () => {
        let cartArr = [];
        for (let id in items){
            cartArr.push(items[id]);
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





    
