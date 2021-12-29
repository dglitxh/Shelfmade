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
        quantity = Number(quantity)
        console.log(quantity)
        let quant = items[id].quantity
        let diff = quant - quantity

        if (quantity <= 0) return

        if (quantity < quant){
            items[id].quantity -= diff
            totalItems -= diff
            items[id].price -= (diff * items[id].item.price)
            totalPrice -= (diff * items[id].item.price)
            settotalItems(totalItems)
            settotalPrice(totalPrice)
            
        }else if(quantity > quant){
            let cartItem = items[id]
            totalItems -= cartItem.quantity
            totalPrice -= cartItem.price
            cartItem.quantity = 0
            cartItem.price = 0
            cartItem.quantity = quantity;
            totalItems += quantity
            cartItem.price = cartItem.item.price * quantity;
            totalPrice += cartItem.price
            settotalItems(totalItems)
            settotalPrice(totalPrice)
            setItems(items)
            console.log(items)
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





    
