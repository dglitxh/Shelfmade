import { useState } from "react";

export const Cart = () => {
    let  [items, setItems] = useState({})
    let  [totalPrice, settotalPrice] =  useState(0)
    let  [totalItems, settotalItems] = useState(0)
    let [prod, setProd] = useState({})
  
  
      const addToCart = (item, id, quantity=1) => {
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
        console.log(items)  
      };
  
      const removeFromCart = (id) => {
          totalItems -= items[id].quantity 
          totalPrice -= items[id].price
          settotalItems(totalItems)
          settotalPrice(totalPrice)
          delete this.items[id]
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

    const changeQunatity = (item, id, num) => {
        console.log(num)
        let quant = items[id].quantity
        let diff = quant - num

        if (num <= 0) return

        if (num < quant){
            items[id].quantity -= diff
            totalItems -= diff
            items[id].price -= (diff * items[id].item.price)
            totalPrice -= (diff * items[id].item.price)
            settotalItems(totalItems)
            settotalPrice(totalPrice)
            
        }else if(num > quant){
            addToCart(item, id)
        }
         
    }

    const getItems = () => {
        let cartArr = [];
        for (let id in items){
            cartArr.push(items[id]);
        }
        return cartArr
    }

    return {changeQunatity, items, totalItems, totalPrice, addToCart, getItems, removeFromCart, getProduct, prod}
}





    
