import React from "react";
import {Link}from 'react-router-dom'
import "./Css/Offer.css";
import {ProductState} from '../Context/Context'
import offerImg from "../images/kisspng-fast-food-hamburger-junk-food-pizza-zapiekanka-fast-food-png-most-popular-fast-food-snacks-in-yo-5ab1baa24963f9.0156344815215970903006.png";
import Rating from "./Rating";
import { AddShoppingCartRounded } from "@material-ui/icons";
function OfferCard({ productDetails={} }) {


  const {dispatch}= ProductState()
  return ( <div className="offer">
      <div className="offer_title">
        Today's <p>Special</p> <p>Offer</p>
      </div>

      <div className="offer_card_container">
        <img src={offerImg} className="offer_card_img" alt="New Offer" />

        <div className="offer_product_name"> <Link to={`productDetails/${productDetails.id}`} className="offer_product_link"> {productDetails.product}</Link> </div>
        <div className="offer_product_info">
          <div className="offer_product_rating"><Rating rate={productDetails.rating}/> </div>
          <div className="offer_product_price">Rs.{productDetails.price}</div>
        </div>
        <button className="offer_cart" onClick={()=>dispatch({type:"ADD",payload:productDetails})}>
       Add to Cart   <AddShoppingCartRounded className="offer_cart_icon"/>
        </button>
      </div>
    </div>
  );
}

export default OfferCard;
