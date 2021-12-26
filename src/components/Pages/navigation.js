import {Link, NavLink} from 'react-router-dom'
import React from 'react';
import { BsBag } from 'react-icons/bs';


export const Navbar = (props) =>{
    const {totalItems} = props
    return(
      <nav class="bg-white shadow dark:bg-gray-800">
    <div class="container px-6 py-3 mx-auto md:flex md:justify-between md:items-center">
      <div class="flex items-center justify-between">
        <div>
          <a class="text-xl font-bold text-gray-800 dark:text-white md:text-2xl hover:text-red-700 dark:hover:text-gray-300" href="#">ShelfMade</a>
        </div>

        <div class="flex md:hidden">
          <button type="button" class="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400" aria-label="toggle menu">
            <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
              <path fill-rule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
            </svg>
          </button>
        </div>
      </div>

    
      <div class="items-center md:flex">
        <div class="flex flex-col md:flex-row md:mx-6">
          <Link to="/" class="my-1 text-gray-700 dark:text-gray-200 hover:text-red-500 dark:hover:text-indigo-400 md:mx-4 md:my-0" href="#">Home</Link>
          <Link to="/shop"class="my-1 text-gray-700 dark:text-gray-200 hover:text-red-500 dark:hover:text-indigo-400 md:mx-4 md:my-0" href="#">Shop</Link>
         </div>

        <div class="flex justify-center md:block">
        <Link as={NavLink} to="/cart">
          <div className='icon'>
            <BsBag />
            <span className='icon-num'>{totalItems}</span>
          </div>
        </Link>
        </div>
      </div>
    </div>
  </nav>
    )
}

