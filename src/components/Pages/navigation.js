import {Link, NavLink} from 'react-router-dom'
import React, { useState } from 'react';
import { BsBag } from 'react-icons/bs';
import { getAuth, signOut } from 'firebase/auth';
import { useDispatch } from "react-redux"
import { logout} from '../../Redux/userSlice';


export const Navbar = (props) =>{
  const dispatch = useDispatch()
  const [isNav, setIsNav] = useState(true)
  const [isUserMenu, setIsUserMenu] = useState(false)
  const {totalItems, user} = props

  const toggleNav = () => {
    if (!isNav) setIsNav(true)
    else setIsNav(false)
  }

  const toggleUserMenu = () => {
    if (!isUserMenu) setIsUserMenu(true)
    else setIsUserMenu(false)
  }
  const signoutAcc = () => {
    const auth = getAuth();
      signOut(auth).then(() => {
        // Sign-out successful.
        console.log("logged out")
        dispatch(logout())
        window.location.reload()
      }).catch((error) => {
        // An error happened.
});
  }
   
    return(
  <nav className="bg-white shadow-sm dark:bg-gray-300">
    <div className=" px-6 py-3 mx-auto md:flex md:justify-between md:items-center">
      <div className="flex items-center justify-between">
        <div>
          <Link to="/" className="text-xl font-bold text-gray-800 dark:text-red-600 md:text-2xl
           hover:text-red-700 dark:hover:text-gray-400">ShelfMade</Link>
        </div>

        <div className="flex md:hidden">
          <button onClick={toggleNav} type="button" className="text-gray-500 dark:text-gray-500 hover:text-gray-600
           dark:hover:text-gray-400 focus:outline-none
           focus:text-gray-600 dark:focus:text-gray-400" aria-label="toggle menu">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
              <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 
              1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
            </svg>
          </button>
        </div>
      </div>

      {isNav?
      <div className="items-center md:flex">
        <div className="flex flex-col md:flex-row md:mx-6">
          <Link to="/" className="my-1 text-lg text-gray-700 dark:text-gray-500 hover:text-red-500 
          dark:hover:text-red-500 md:mx-4 md:my-0">Home</Link>
          <Link to="/shop"className="my-1 text-lg text-gray-700 dark:text-gray-500 hover:text-red-500 
          dark:hover:text-red-500 md:mx-4 md:my-0" >Shop</Link>
          {user?
              <div>
                  <button onClick={toggleUserMenu} className="inline-flex justify-center w-full rounded-md cursor:pointer px-3 py-1 bg-white 
                  text-lg font-large dark:text-red-500 text-gray-500 hover:bg-gray-50 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" 
                  id="menu-button"> 
                    {user.displayName.split(' ')[0]}
                  <svg className="-mr-1 ml-1 h-5 w-5 cursor:pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" 
                  aria-hidden="true">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4
                     4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  </button>
                  {isUserMenu?
                  <div className="origin-top-right sm:absolute  right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 
                  ring-black ring-opacity-5 focus:outline-none" >
                    <div className="py-1" role="none">
                          <button onClick={() => {signoutAcc()}} className="text-gray-700 block w-full text-left px-4 py-2 text-sm" 
                           id="menu-item-1">
                            Sign out
                          </button>
                    </div>
                  </div>
                  :
                  <></>
                }
            </div>
            :
            <Link to="/login" className="my-1 text-bold text-lg text-gray-700 dark:text-gray-500 hover:text-red-500 
            dark:hover:text-red-400 md:mx-4 md:my-0" >Login</Link>
           
            
          }
          
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
        
       :
       <></>}
    </div>
  </nav>

    )
}

