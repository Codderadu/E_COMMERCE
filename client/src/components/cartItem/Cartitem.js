import React from "react";
import dummyCarImg from '../../assets/naruto.jpeg'
import './Cartitem.scss'
import {AiOutlineClose} from 'react-icons/ai'
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/cartSlice";
function Cartitem({cart}) {

  const dispatch=useDispatch()
  return <div className="Cartitem">
          <div className=" item-img">
            <img src={cart.image} alt="" />
          </div>
            <div className="item-info-wrapper">
          <div className="titem-info">
            <p className="title">{cart.title}</p>
            <p className="price">${cart.price}</p>
            <div className="quantity-selector">
              <span className="btn deecreament"  onClick={()=>dispatch(removeFromCart(cart))}>-</span>
              <span className="quantity">{cart.quantity}</span>
              <span className="btn increament" onClick={()=>dispatch(addToCart(cart))}>+</span>
            </div>
            <p className="total-price"> Subtotal:{cart.quantity*cart.price}</p>
          </div>
          <div className="item-remove">
           <AiOutlineClose/> 
          </div>
          </div>
  </div>;
}

export default Cartitem;
