import React from "react";
import { Link, useParams } from "react-router-dom";
import {BsFillCartCheckFill} from 'react-icons/bs'
import {BiErrorCircle} from 'react-icons/bi'
import './Payments.scss'
import { useDispatch } from "react-redux";
import { resetCart } from "../../redux/cartSlice";

function Payments() {

    const params=useParams();
    const status=params.status;
    const dispatch=useDispatch()

   

    const infoData={
        success:{
           message:'Your Order has been placed',
           cta:'Shop more',
           icon:<BsFillCartCheckFill/>
        },
        failed:{
            message:'Your Order has been placed',
            cta:'Shop more',
            icon:<BiErrorCircle/>
         }
    }
    if(status==='success'){
      dispatch(resetCart())
    }
    // const nevigate=useNavigate()

  return <div className="Payments">
    <div className="icon">{infoData[status].icon}</div>
    <h2 className="heading">{infoData[status].message}</h2>
    <Link to='/'>
    <button className="btn-primary">{infoData[status].cta}</button></Link>
  </div>;
}

export default Payments;
