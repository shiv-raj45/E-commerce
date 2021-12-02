import { useEffect, useState } from "react";
import { ProductState } from "../Context/Context";
import { total } from "../Context/reducer";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./Css/Cart.css";
import SingleItem from "./SingleItem.jsx";
import {
  KeyboardArrowLeft,
  KeyboardArrowRight
} from "@material-ui/icons";
import EmptyCart from "./EmptyCart";
import ShopNowButton from "./ShopNowButton";

function Cart() {
  const [authorized, setAuthorized] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(null);
  useEffect(() => {
    localStorage.getItem("accessToken")
      ? setAuthorized(true)
      : setAuthorized(false);
  }, []);
  const history = useHistory();
  const {
    state: { cart, id },
    dispatch,
  } = ProductState();
  const [showToast, setShowToast] = useState(false);
  const expense = total(cart);
  const [animateNumber, setAnimateNumber] = useState(-1);
  const [animate, setAnimate] = useState(false);

  const checkOut = () => {
    const credentials = cart.map((product) => {
      return {
        productName: product.product,
        price: product.price,
        rating: product.rating,
        userId: id,
      };
    });
    console.log(credentials);
    axios
      .post("http://localhost:2000/postorders", {
        productdetails: credentials,
        userId: id,
      })
      .then((response) => {
        setShowToast(true);
        console.log(response.data);
        setCheckoutSuccess(response.data.successful);
      });

    localStorage.getItem("accessToken")
      ? setAuthorized(true)
      : setAuthorized(false);
  };
  return (
    <div className="cart">
      <ShopNowButton text={"Continue Shopping"} />
    {cart.length>1 ? <div className="cart_site_info">
        <span className="cart_subtotal"> Subtotal:Rs.{expense} </span>
        <button className="cart_checkout" onClick={checkOut}>Checkout </button>
      </div>:''}
      <div className="cart_container_wrapper">
        {cart.map((cartItem, index) => (
          <div className="product_cart_container">
            <SingleItem product={cartItem} replaceWithRemove={true} />
            <div className="product_cart_info">
              <button
                className="quantity_button"
                onClick={() => {
                  dispatch({ type: "DECREASE", payload: cartItem });
                  setAnimateNumber(index);
                  if (index === animateNumber) {
                    setAnimate(true);
                    setTimeout(() => {
                      setAnimate(false);
                    }, 2000);
                  }
                }}
              >
                <KeyboardArrowLeft />
              </button>

              <span
                className={`cart_product_quantity ${
                  animate && index === animateNumber && "animate"
                }`}
              >
                {cartItem.quantity}
              </span>

              <button
                className="quantity_button"
                onClick={() => {
                  dispatch({ type: "INCREASE", payload: cartItem });
                  setAnimateNumber(index);
                  if (index === animateNumber) {
                    setAnimate(true);
                    setTimeout(() => {
                      setAnimate(false);
                    }, 2000);
                  }
                }}
              >
                <KeyboardArrowRight />
              </button>
            </div>
          </div>
        ))}
      </div>

      {cart.length === 0 && <EmptyCart />}
    </div>
  );
}

export default Cart;
