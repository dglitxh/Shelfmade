import {Link, NavLink} from 'react-router-dom'
import React, { useState } from 'react';
import { BsBag } from 'react-icons/bs';


export const Navbar = (props) =>{
  const [isNav, setIsNav] = useState(true)

  const toggleNav = () => {
    if (!isNav) setIsNav(true)
    else setIsNav(false)
  }
    const {totalItems} = props
    return(
      <nav className="bg-white shadow-sm dark:bg-gray-300">
    <div className="container px-6 py-3 mx-auto md:flex md:justify-between md:items-center">
      <div className="flex items-center justify-between">
        <div>
          <Link to="/" className="text-xl font-bold text-gray-800 dark:text-gray-400 md:text-2xl hover:text-red-700 dark:hover:text-gray-300">ShelfMade</Link>
        </div>

        <div className="flex md:hidden">
          <button onClick={toggleNav} type="button" className="text-gray-500 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400" aria-label="toggle menu">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
              <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
            </svg>
          </button>
        </div>
      </div>

      {isNav?
      <div className="items-center md:flex">
        <div className="flex flex-col md:flex-row md:mx-6">
          <Link to="/" className="my-1 text-gray-700 dark:text-gray-500 hover:text-red-500 dark:hover:text-indigo-400 md:mx-4 md:my-0">Home</Link>
          <Link to="/shop"className="my-1 text-gray-700 dark:text-gray-500 hover:text-red-500 dark:hover:text-indigo-400 md:mx-4 md:my-0" >Shop</Link>
          <Link to="/login" className="my-1 text-gray-700 dark:text-gray-500 hover:text-red-500 dark:hover:text-indigo-400 md:mx-4 md:my-0" >login</Link>
           <Link to="/signup" className="my-1 text-gray-700 dark:text-gray-500 hover:text-red-500 dark:hover:text-indigo-400 md:mx-4 md:my-0" >Sign up</Link>
         </div>
         
          
        <div className="flex justify-center md:block">
        <Link as={NavLink} to="/cart">
          <div className='icon'>
            <BsBag />
            <span className='icon-num'>{totalItems}</span>
          </div>
        </Link>
        </div>
      </div>
       :<></>}
    </div>
  </nav>
    )
}

