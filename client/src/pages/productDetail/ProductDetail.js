import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import dummyImg from '../../assets/naruto.jpeg'
import { addToCart, removeFromCart } from "../../redux/cartSlice";
import { axiosClient } from "../../utils/axiosClient";
import './ProductDetail.scss'

function ProductDetail() {
  const params=useParams();
  const [productDetail,setProductDetail]=useState(null);

  const dispatch=useDispatch();
  const cart =useSelector(state=>state.cartReducer.cart)
  const quantity=cart.find(item=>item.key===params.productId)?.quantity||0;


  // const cart =use

  async function fetchData(){
          const productDetailsResponse= await axiosClient.get(`/products?filters[key][$eq]=${params.productId}&populate=image`)
          if(productDetailsResponse.data.data.length>0){
              setProductDetail(productDetailsResponse.data.data[0])
          }
          
        }

  useEffect(()=>{
    setProductDetail(null);
       fetchData();
  },[params])

  if(!productDetail){
    return <div className="loading">Loading.....</div>
  }
  return(
  <div className="ProductDetail">
    <div className="container">
      <div className="product-layout ">
        <div className="product-Img center">
           <img src={productDetail?.attributes.image.data.attributes.url} alt="product-IMg" />
        </div>
        <div className="product-info">
          <h1 className="heading">{productDetail?.attributes.title}</h1>
          <h3 className="price">{productDetail?.attributes.price}</h3>
          <p className="description">{productDetail?.attributes.discr}</p>
           <div className="cart-options">
            <div className="quantity-selector">
              <span className="btn deecreament" onClick={()=>dispatch(removeFromCart(productDetail))}>-</span>
              <span className="quantity">{quantity}</span>
              <span className="btn increament" onClick={()=>dispatch(addToCart(productDetail))}>+</span>
            </div>
            <button className="button btn-primary" onClick={()=>dispatch(addToCart(productDetail))}>Add to Cart</button>
           </div>
           <div className="return-policy">
            <ul>
              <li> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga iusto aliquid rerum odit asperiores expedita! </li>
              <li>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus sed saepe error laborum amet facilis similique. Ratione error numquam a!</li>
            </ul>
           </div>
        </div>

      </div>
    </div>

  </div>
  );
}

export default ProductDetail;
