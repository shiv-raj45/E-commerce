import { ProductState } from "../Context/Context";
import ProductCard from "./ProductCard";

import { useEffect, useState } from "react";
import axios from "axios";

import "./Css/Home.css";
import buttonImg from "../images/delivery-vector-graphics-computer-icons-clip-art-illustration-delivery-man-bd38cd1945ea8a2acb0e34ff1d63b1a8.png";
import HomeAboutus from "./HomeAboutus";
import Story from "./Story.jsx";
import { AccessAlarm, AddIcCall, Email } from "@material-ui/icons";
import OfferCard from "./OfferCard";
import Reviews from "./Reviews";
import Spinner from "./Spinner";
function Home() {
  const [availableProduct, setAvailableProduct] = useState([]);
  const [loading, setLoading] = useState("");
  const {dispatch} = ProductState();

  useEffect(() => {
    setLoading(true);

    const getproducts = () => {
      axios
        .get("http://localhost:2000/products")
        .then((response) => {
          console.log(response.data);
          setAvailableProduct(response.data);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setLoading(false);
          dispatch({ type: "LOAD_PRODUCTS", payload: availableProduct });
        });
    };

    getproducts();
  }, [availableProduct,dispatch]);

  return (
    <div className="home">
      <div className="home_banner">

        <div className="banner_text_section">
          <div className="banner_text_upper_button">
            <img className="banner_text_buttonimg" src={buttonImg} alt="logo" />
            fast Delivery
          </div>
          we don't sell food...
          <p>
            We sell <span className="banner_text_special"> quality </span>
          </p>
          <p className="banner_text_info">
            Home Delivery and online reservation system for office,home,small
            shops & grocery
          </p>
        </div>

        <div className="banner_img_section">
          <div className="banner_img_reviews">
            <div className="review_container">
              <div className="banner_img_reviewer"></div>
              <div className="banner_img_reviewer"></div>
              <div className="banner_img_reviewer"></div>
            </div>
            <div className="banner_img_review_text">4.7 (104 reviews)</div>
          </div>

          <div className="banner_img_satisfied_customers">
            satisfied customers
          </div>

          <div className="banner_img_confirm_order">delivery in 30 mins</div>
        </div>
      </div>

      <div className="home_services">
        <HomeAboutus
          text={"available 6:00 AM to 8:00 PM"}
          icon={<AccessAlarm />}
        />
        <HomeAboutus text={"+977 980222222"} icon={<AddIcCall />} />
        <HomeAboutus text={"foody@gmail.com"} icon={<Email />} />
      </div>

      <Story />
      <OfferCard
        productDetails={
          availableProduct[Math.floor(availableProduct.length / 2)]
        }
      />
      <div className="hot_topics">Trending Pizzas </div>
      <div className="trending_products">
        {loading ? (
          <Spinner />
        ) : (
          <ProductCard
            data={availableProduct.filter((el) => el.categoryid === 2)}
          />
        )}
      </div>
      <div className="hot_topics">Trending icecream </div>

      <div className="products_For_You">
        {loading ? (
          <Spinner />
        ) : (
          <ProductCard
            data={availableProduct.filter((el) => el.categoryid === 3)}
          />
        )}
      </div>
      <div className="hot_topics">Trending Cakes </div>
      <div className="trending_products">
        {loading ? (
          <Spinner />
        ) : (
          <ProductCard
            data={availableProduct.filter((el) => el.categoryid === 4)}
          />
        )}
      </div>
      <div className="hot_topics">Customer Reviews </div>

      <div className="reviews_wrapper">
        <Reviews />
      </div>
    </div>
  );
}

export default Home;
