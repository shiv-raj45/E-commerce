import React, {  } from "react";
import { Link } from "react-router-dom";
import { ProductState } from "../Context/Context";
import Rating from "./Rating";
import offerImg from "../images/kisspng-fast-food-hamburger-junk-food-pizza-zapiekanka-fast-food-png-most-popular-fast-food-snacks-in-yo-5ab1baa24963f9.0156344815215970903006.png";

import "./Css/ProductCard.css";
import { AddShoppingCartSharp } from "@material-ui/icons";
function ProductCard({ data=Array(5),loading}) {
  const { dispatch } = ProductState();

  const addToCart = (product) => {
    dispatch({ type: "ADD", payload: product });
  };

  return (
 <div className="product_row">
      {data.map((product, index) => {
        return (
            <div className="product_container" key={index}>
            <img src={offerImg} className="product_img" alt="product_img" />

            <div className="product_info">

            <Link to={`/productDetails/${product.id}` }className="product_link">
              <div className="product_info_text">
                <div className="product_info_name">
                    {product.name || product.product}
                </div>

                <div className="product_info_rating">
                  <Rating rate={product.rating} className="product_rating"/>
                </div>
                <div className="product_info_price">Rs.{product.price} </div>
              </div>
              </Link>

              <button
                className="add_to_cart_button"
                onClick={() => addToCart(product)}
              >
              <AddShoppingCartSharp/>
              </button>
            </div>
          </div>
        );
      })}
    </div>);
}

export default ProductCard;
