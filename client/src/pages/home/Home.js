import React, { useEffect, useState } from "react";
import Hero from '../../components/hero/Hero'
import Category from '../../components/category/Category'
import Product from '../../components/product/Product'
import './Home.scss'
import { axiosClient } from "../../utils/axiosClient";
import { useSelector } from "react-redux";
function Home() {
  
  
  const categories =useSelector(state=>state.categoryReducer.categories)
  const [topProduct,setTopProduct]=useState(null)
  
  async function fetchData(){
   
    const topProductResponse= await axiosClient.get('/products?filters[isTopPick][$eq]=true&populate=image')
    
  
   setTopProduct(topProductResponse.data.data)



  }
useEffect(()=>{
   fetchData();
},[])

  return ( 
  <div className='Home'>
    <Hero/>
    <section className="collection container">
      <div className="info">
        <h2 className="heading">Shop By Categories</h2>
        <p className="subHeading">
          Shop From the best,our Film and TV Posters Collection
          </p>
      </div>

      <div className="content">
       {categories?.map(category=><Category key={category.id} category={category}/>)}
      </div>
    </section>

    <section className="collection container">
      <div className="info">
        <h2 className="heading">Our Tops Picks</h2>
        <p className="subHeading">
          Shop From the best,our Film and TV Posters Collection
          </p>
      </div>

      <div className="content">
        {topProduct?.map(product=><Product key={product.id} product={product}/>)}
      </div>
    </section>
  </div>
  );
}

export default Home;
