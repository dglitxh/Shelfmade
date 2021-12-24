import {Link, NavLink} from 'react-router-dom'
import React from 'react';
import { BsBag } from 'react-icons/bs';


export const Navbar = (props) =>{
    const {totalItems} = props
    return(
        <nav
        className="root"
      >
        <Link as={NavLink} to="/">
          Home
        </Link>
        <Link as={NavLink} to="/shop">Shop</Link>
        <Link as={NavLink} to="/cart">
          <div className='icon'>
            <BsBag />
            <span className='icon-num'>{totalItems}</span>
          </div>
        </Link>
      </nav>
    )
}

