import React from "react";
import './Footer.scss'
import {AiOutlineInstagram,AiOutlineFacebook,AiOutlineTwitter,AiOutlineMail} from 'react-icons/ai'
import creditCardImg from '../../assets/creditcardicons.png'
function Footer() {
  return(
   <div className="Footer">
    <div className="container">
      <div className="content">
        <div className="footer-left">
          <h3 className="heading">Social Media</h3>
          <ul className="follow">
            <li className="hover-link center">
               <AiOutlineInstagram/>             
            </li>
            <li className="hover-link center">
              <AiOutlineFacebook/>
            </li>
            <li className="hover-link center">
            <AiOutlineTwitter/>        
               </li>
            <li className="hover-link center">
              <AiOutlineMail/>
            </li>
          </ul>
        </div>
        <div className="footer-right">
          <h3 className="heading">Company</h3>
          <ul className="company">
            <li className="hover-link">Contus Us</li>
            <li className="hover-link">Privacy Policy</li>
            <li className="hover-link">Returns and Exchange</li>
            <li className="hover-link">Shipping Policy</li>
            <li className="hover-link">Terms and Condition</li>
          </ul>
        </div>
      </div>
    <div className="subFooter center">
      <div className="credit-card-img">
        <img src={creditCardImg} alt="" />
      </div>
      <p>Copyright {new Date().getFullYear()} @ <strong>Posterz.</strong></p>
    </div>
    </div>
    </div>
    );
}

export default Footer;
