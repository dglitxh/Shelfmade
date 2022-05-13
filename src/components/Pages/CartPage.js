import { Link } from "react-router-dom"
import React, { useState } from "react"
import { checkout } from "./checkout"
import{
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useDisclosure
} from '@chakra-ui/react'

const CartPage = (props) => {
  const {user, items, totalPrice, changeQuantity, removeFromCart} = props
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [id, setId] = useState('')
  const cancelRef = React.useRef()
  console.log(items)



    return(
        <div>
    <div className="flex justify-center my-6">
  <div className="flex flex-col w-full p-8 text-gray-800 bg-white shadow-lg pin-r pin-y md:w-4/5 lg:w-4/5">
    <div className="flex-1">
      <table className="w-full text-sm lg:text-base" cellspacing="0">
        <thead>
          <tr className="h-12 uppercase">
            <th className="hidden md:table-cell"></th>
            <th className="text-left">Product</th>
            <th className="lg:text-right text-left pl-5 lg:pl-0">
              <span className="lg:hidden" title="Quantity">Qtd</span>
              <span className="hidden lg:inline">Quantity</span>
            </th>
            <th className="hidden text-right md:table-cell">Unit price</th>
            <th className="text-right">Total price</th>
          </tr>
        </thead>

        <tbody>
        {items.map((listItem) => {
          
        return(
          <tr key={listItem.item.id}>
            <td className="hidden pb-4 md:table-cell">
              <Link to='/details'>
                <img src={listItem.item.product_img} className="w-20 rounded" alt="Thumbnail"/>
              </Link>
            </td>
            <td>

                <p className="mb-2 md:ml-4">{listItem.item.title}</p>
                <form action="" >
                  <button onClick={() => {
                    return(
                      setId(listItem.item.id),
                      onOpen()
                    )}} className="text-gray-700 md:ml-4">
                    <small> <svg aria-hidden="true" data-prefix="far" data-icon="trash-alt" className="w-4 text-red-600 hover:text-red-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M268 416h24a12 12 0 0012-12V188a12 12 0 00-12-12h-24a12 12 0 00-12 12v216a12 12 0 0012 12zM432 80h-82.41l-34-56.7A48 48 0 00274.41 0H173.59a48 48 0 00-41.16 23.3L98.41 80H16A16 16 0 000 96v16a16 16 0 0016 16h16v336a48 48 0 0048 48h288a48 48 0 0048-48V128h16a16 16 0 0016-16V96a16 16 0 00-16-16zM171.84 50.91A6 6 0 01177 48h94a6 6 0 015.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0012-12V188a12 12 0 00-12-12h-24a12 12 0 00-12 12v216a12 12 0 0012 12z"/></svg></small>
                  </button>
                </form>

            </td>
            <td className="justify-center md:justify-end md:flex mt-6">
            <div className="flex items-center">
            <button onClick={(e) => {changeQuantity(listItem.item.id, "subtract")}} className="text-gray-500 focus:outline-none focus:text-gray-600">
                 <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </button>
                <span className="text-gray-700 mx-2">{listItem.quantity}</span>
                <button onClick={(e) => changeQuantity(listItem.item.id, "add")} className="text-gray-500 focus:outline-none focus:text-gray-600">
                  <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </button>
               </div>
            </td>
            <td className="hidden text-right md:table-cell">
              <span className="mb-2 md:ml-4">
              GH₵ {listItem.item.price}
              </span>
            </td>
            <td className="text-right">
              <p className="mb-2 md:ml-4">
              GH₵ {listItem.price}
              </p>
            </td>
          </tr>
        )
          })}
        </tbody>
      </table>
      <hr className="pb-6 mt-6"/>
      <div className="my-4 mt-6 -mx-2 lg:flex">
        <div className="lg:px-2 lg:w-1/2">


          <div className="p-4 mt-6 bg-gray-100 rounded-full">
            <h1 className="ml-2 font-bold uppercase">Instruction for seller</h1>
          </div>
          <div className="p-4">
            <p className="mb-4 italic">If you have some information for the seller you can leave them in the box below</p>
            <textarea placeholder="leave instructions" className="w-full h-24 p-2 bg-gray-100 rounded"></textarea>
          </div>
        </div>
        <div className="lg:px-2 lg:w-1/2">
          <div className="p-4 bg-gray-100 rounded-full">
            <h1 className="ml-2 font-bold uppercase">Order Details</h1>
          </div>
          <div className="p-4">
            <p className="mb-6 italic">Shipping and additionnal costs are calculated based on values you have entered</p>

                <div className="flex justify-between pt-4 border-b">
                  <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                    Total
                  </div>
                  <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                  GH₵ {totalPrice}
                  </div>
                </div>
              <Link to={!user? '/': ''}>
                <button onClick={() => checkout(user.email, totalPrice)} className="flex justify-center w-full px-10 py-3 mt-6 font-medium text-white uppercase bg-gray-800 rounded-full shadow item-center hover:bg-gray-700 focus:shadow-outline focus:outline-none">
                  <svg aria-hidden="true" data-prefix="far" data-icon="credit-card" className="w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M527.9 32H48.1C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48.1 48h479.8c26.6 0 48.1-21.5 48.1-48V80c0-26.5-21.5-48-48.1-48zM54.1 80h467.8c3.3 0 6 2.7 6 6v42H48.1V86c0-3.3 2.7-6 6-6zm467.8 352H54.1c-3.3 0-6-2.7-6-6V256h479.8v170c0 3.3-2.7 6-6 6zM192 332v40c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12zm192 0v40c0 6.6-5.4 12-12 12H236c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12z"/></svg>
                  <span className="ml-2 mt-5px">Procceed to checkout</span>
                </button>
              </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<AlertDialog
       isOpen={isOpen}
       leastDestructiveRef={cancelRef}
       onClose={onClose}
     >
       <AlertDialogOverlay>
         <AlertDialogContent>
           <AlertDialogHeader fontSize='lg' fontWeight='bold'>
             Delete Item
           </AlertDialogHeader>

           <AlertDialogBody>
             Are you sure? You can't undo this action afterwards.
           </AlertDialogBody>

           <AlertDialogFooter>
             <Button ref={cancelRef} onClick={onClose}>
               Cancel
             </Button>
             <Button colorScheme='red' onClick={(e) => {
               return (removeFromCart(e, id),
               onClose())
             }} ml={3}>
               Delete
             </Button>
           </AlertDialogFooter>
         </AlertDialogContent>
       </AlertDialogOverlay>
     </AlertDialog>
  </div>

    )
}


export default CartPage
