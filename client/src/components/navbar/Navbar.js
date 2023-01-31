import React, { useState } from "react";
import './Navbar.scss';
import {Link} from 'react-router-dom'
import {BsCart2} from 'react-icons/bs'
import Cart from '../cart/Cart'
import { useSelector } from "react-redux";


function Navbar() {
  const [openCart ,setOpenCart]=useState(false)

  const cart =useSelector(state=>state.cartReducer.cart)
  let totalItem=0
  cart.forEach(item=>totalItem+=item.quantity)

  const categories =useSelector(state=>state.categoryReducer.categories)
  // console.log(categories);
  return (
    <>
    <div className="Navbar">
      <div className="container nav-container">
        <div className="nav-left">
            <ul className="link-group">
              {categories?.map((category)=>(<li  key={category.id} className="hover-link">
                 <Link className="link"  to={`/category/${category.attributes.key}`}>{category.attributes.title}</Link>
               </li>))}
            </ul>
        </div>
        <div className="nav-center">
          <Link to='/'>
            <h1 className="banner">Posterz.</h1>
          </Link>
        </div>
        <div className="nav-right">
          <div  onClick={()=>setOpenCart(!openCart)} className="nav-cart">
            <BsCart2 className='icon'/>
            {totalItem>0 && <span className="count center">{totalItem}</span>}
            
          </div>
        </div>
      </div>
    </div>
    { openCart  && <Cart  onClose={()=>setOpenCart(false)}/>}
    </>
    
  );
}


export default Navbar;
