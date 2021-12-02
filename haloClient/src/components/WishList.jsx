import axios from "axios";
import React, { useEffect, useState } from "react";
import { ProductState } from "../Context/Context";
import SingleItem from "./SingleItem";
import Spinner from "./Spinner";
import "./Css/Wishlist.css";
import {
  FavoriteOutlined,
  SearchRounded,
} from "@material-ui/icons";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
function WishList() {
  const { state } = ProductState();
  const [loading, setLoading] = useState(false);
  const [wishList, setWishList] = useState([]);
  const history = useHistory();
  useEffect(() => {
    const fetchWishlist = () => {
      setLoading(true);

      axios
        .post("http://localhost:2000/getWishList", { userId: state.id })
        .then((res) => {
          console.log(res.data);
          setWishList(res.data);
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    };
    if (state.id) fetchWishlist();
  }, [state.id]);
  const removeFromWishlist = (id) => {
    setWishList(wishList.filter((el, index) => el.id !== id));

    axios
      .post("http://localhost:2000/addToWishList", {
        userId: state.id,
        productId: id,
      })
      .then((response) => {
        console.log(response.data.added);
      });
  };
  return (
    <div className="wishlist">
      {loading ? (
        <Spinner />
      ) : (
        wishList.map((wish, index) => {
          return (
            <div className="wish_product">
              <SingleItem product={wish} />
              <button
                className="wishlist_remove_button"
                onClick={() => removeFromWishlist(wish.id)}
              >
                remove from wishlist
                <FavoriteOutlined className="remove_icon" />
              </button>
            </div>
          );
        })
      )}

      {(!state.id  && wishList.length === 0) && (
        <div className="empty_wishlist_container">
          <p className="empty_wishlist">

            you must first
            <span style={{ color: "orange", marginLeft: "1rem" }}>

              Login !!!
            </span>
          </p>
          <p>
            <button className="empty_wishlist_button" onClick={() => history.push("/login")}>
              Login
            </button>
          </p>
        </div>
      )}
      {(state.id && wishList.length < 1) && (
        <div className="empty_wishlist_container">
          <p className="empty_wishlist">

            you don't have
            <span style={{ color: "orange", marginLeft: "1rem" }}>

              wishList :(
            </span>
          </p>
          <p>
            <button className="empty_wishlist_button" onClick={() => history.push("/searchpage")}>
              Search your favourite Food <SearchRounded />
            </button>
          </p>
        </div>
      )}
    </div>
  );
}

export default WishList;
