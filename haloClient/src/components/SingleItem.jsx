import { AddShoppingCartSharp, RemoveShoppingCartOutlined, RemoveShoppingCartSharp } from '@material-ui/icons'
import React from 'react'
import { Link } from 'react-router-dom'
import Rating from './Rating'
import offerImg from "../images/kisspng-fast-food-hamburger-junk-food-pizza-zapiekanka-fast-food-png-most-popular-fast-food-snacks-in-yo-5ab1baa24963f9.0156344815215970903006.png";
import { ProductState } from '../Context/Context';

function SingleItem({product,replaceWithRemove}) {
const {dispatch}=ProductState()

    const addToCart = (product) => {
        dispatch({ type: "ADD", payload: product });
      };
    

    return (
        <div className="product_container">
        <img src={offerImg} className="product_img" alt="product_img" />

        <div className="product_info">
        <Link to={`/productDetails/${product.id}` }className="product_link">
         
          <div className="product_info_text">
            <div className="product_info_name">
                {product.product}
            </div>

            <div className="product_info_rating">
              <Rating rate={product.rating} className="product_rating"/>
            </div>
            <div className="product_info_price">Rs.{product.price} </div>
          </div>
          </Link>


       {replaceWithRemove?( <button
            className="add_to_cart_button"
            onClick={() =>dispatch({type:"REMOVE",payload:product})}
          >  <RemoveShoppingCartOutlined/>  </button>): <button
            className="add_to_cart_button"
            onClick={() => addToCart(product)}
          ><AddShoppingCartSharp/>
          </button>
}  
                  </div>
      </div>
    )
}

export default SingleItem
