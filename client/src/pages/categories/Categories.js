import React, { useState ,useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import Product from "../../components/product/Product";
import './Categories.scss'
import { useSelector } from "react-redux";
import { axiosClient } from "../../utils/axiosClient";
function Categories() {
  const nevigate=useNavigate();
 const params=useParams()  
 const [categoryId,setCategoryId]=useState('');

 const [product, setProduct]=useState([]);

 const categories =useSelector(state=>state.categoryReducer.categories)

 const sortOption=[{
  value:'price-Low To High',
  sort:'price'
},
{
  value:'Newest First',
  sort:'createdAt'
}
]

const [sortBy,setSortBy]=useState(sortOption[0].sort)
  
 async function fetchProduct(){
  const url=params.categoryId
      ?`/products?populate=image&filters[category][key][$eq]=${params.categoryId}&sort=${sortBy}`
      : `/products?populate=image&sort=${sortBy}`;

   const response=await axiosClient.get(url)
  setProduct(response.data.data);
 }


  useEffect(()=>{
    setCategoryId(params.categoryId)
    //API Call
    fetchProduct();
  },[params,sortBy])

  function hahdleChange(e){
    nevigate(`/category/${ e.target.value}`)
  }

 
// function handleSelectChange(e){
//   const sortKey=e.target.value;
//   setSortBy(sortKey);
// }

  return (
   <div className="Categories">
      <div className="container">
        <div className="header">
        <div className="info">
          <h2 className="heading">Explores All print and Artswork</h2>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt, totam. Ut odio cupiditate illum temporibus?</p>
        </div>
        <div className="sort-by">
          <div className="sorted-by-container">
            <h3 className="sorted-by-text">Sort By</h3>
            <select    className="select-by-sort" name="sort-by" id="sort-by" onChange={(e)=>setSortBy(e.target.value)}>

              {sortOption?.map(item=> <option key={item.value}  value={item.sort}>{item.value}</option>)}
              
              {/* <option value="newest-first">Newest First</option>
              <option value="price lth">Price low to high</option> */}
            </select>
          </div>
        </div>
        </div>

        <div className="content">
          <div className="filter-box">
                <div className="caterogy-filter">
                  <h3>Category</h3>
                 { categories.map((item)=>(
                  <div key={item.id} className="filter-radio">
                    <input 
                    name="category"  
                    value={item.attributes.key} 
                    type="radio" 
                    onChange={hahdleChange} 
                    id={item.id} 
                    checked={item.attributes.key===categoryId}
                    />
                    <label htmlFor={item.id} >{item.attributes.title}</label>
                  </div>))}
                  {/* <div className="filter-radio">
                    <input name="category" type="radio" id="TV-shows" />
                    <label htmlFor="TV-shows">TV Shows</label>
                  </div>
                  <div className="filter-radio">
                    <input name="category" type="radio" id="sport" />
                    <label htmlFor="sport">Sports</label>
                  </div> */}
                </div>
          </div>
          <div className="products-box">
                  {product?.map((product)=> <Product  key={product.id} product={product}/> )}
          </div>
        </div>
     </div>
   </div>
  );
}

export default Categories;
