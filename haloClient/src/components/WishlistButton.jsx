import { FavoriteBorderOutlined, FavoriteRounded } from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ProductState } from "../Context/Context";
import './Css/ProductDetails.css'
function WishlistButton({ product }) {
  const { state } = ProductState();
  const [wishlitStatus, setWishlitStatus] = useState("");

  useEffect(() => {
    axios
      .post(`http://localhost:2000/details/${product.id}`, { userId: state.id })
      .then((response) => {
        setWishlitStatus(response.data.wishListStatus.added);
      })
      .catch((error) => console.log(error));
  }, [product.id, state.id]);

  const addToWishList = (id) => {
    axios
      .post("http://localhost:2000/addToWishList", {
        userId: state.id,
        productId: id,
      })
      .then((response) => {
        console.log(response.data.added);
        setWishlitStatus(response.data.added);
      });
  };

  return (
    <>
      {state.id && (
        <button onClick={() => addToWishList(product.id)}>
          {wishlitStatus ? (<b className="wishlist_button"> <FavoriteRounded/> Remove from wishlist  </b>) :  <b className="wishlist_button"><FavoriteBorderOutlined/>Add to wishlist </b> }
        </button>
      )}
    </>
  );
}

export default WishlistButton;
