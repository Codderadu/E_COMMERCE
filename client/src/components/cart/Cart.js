import React from "react";
import './Cart.scss'
import {BsCartX} from 'react-icons/bs'
import {AiOutlineClose} from 'react-icons/ai'
import Cartitem from "../cartItem/Cartitem";
import {useSelector} from 'react-redux'
import {axiosClient} from '../../utils/axiosClient'

import {loadStripe} from '@stripe/stripe-js';




function Cart({onClose}) {
  
  const cart =useSelector(state=>state.cartReducer.cart)
  
  let total=0;
  cart.forEach(item=>total+=(item.quantity*item.price))
const isCartEmpty=cart.length===0;



async function handleChackout(){

  const response=await axiosClient.post('/orders',{
    products:cart
  })
  const stripe=await loadStripe(`${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`);
  await stripe.redirectToCheckout({
    sessionId:response.data.stripeId

  })
}

  return <div className="Cart">
    <div className="overlay">
      <div className="cart-containt">
        <div className="heading">
          <h3>Shopping Cart</h3>
        <div
        onClick={onClose} 
        className="close-btn"> 
      <AiOutlineClose/>Close</div>
        </div>
        <div className="cart-items">
        {cart?.map(item=><Cartitem key={item.key} cart={item}/>)}
        </div>
        {isCartEmpty && <div className="empty-cart">
          <div className="icon"><BsCartX/></div>
          <h4>Cart is Empty</h4>
        </div>}

        {!isCartEmpty && <div className="checkout-info">
           <div className="total-amount">
            <h3 className="total-message">Total:</h3>
            <h3 className="total-value">{total}</h3>
           </div>
           <div className="check-button">
          <button className=" button btn-primary" onClick={handleChackout}>Check out</button>
          </div></div>}
      </div>
    </div>
  </div>;
}

export default Cart;
