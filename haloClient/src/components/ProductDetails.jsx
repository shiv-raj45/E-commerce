import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  useLocation,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { ProductState } from "../Context/Context";
import Feedback from "./Feedback";
import Rating from "./Rating";
import Spinner from "./Spinner";
import WishlistButton from "./WishlistButton";
import "./Css/ProductDetails.css";
import ProductImage from "../images/kisspng-fanta-fizzy-drinks-diet-coke-coca-cola-juice-fanta-5ac6931aeaac34.5705116715229632269612.png";
import { ShoppingCartSharp, SpeakerNotesOff } from "@material-ui/icons";
import SingleItem from "./SingleItem";
import Avatar from "@material-ui/core/Avatar";

function ProductDetails() {
  const { state, dispatch } = ProductState();
  const { id } = useParams();

  const [loading, setLoading] = useState(null);
  const [details, setDetails] = useState([]);
  const [wishlitStatus, setWishlitStatus] = useState("");
  const [recommended, setRecommended] = useState([]);
  const [clientFeedback, setClientFeedback] = useState([]);
  useEffect(() => {
    setLoading(true);
    const fetchDetails = () => {
      axios
        .post(`http://localhost:2000/details/${id}`, { userId: state.id })
        .then((response) => {
          console.log(response.data);
          setDetails(response.data.productDetails);
          console.log(response.data.wishListStatus);
          setWishlitStatus(response.data.wishListStatus.added);
          console.log(response.data.feedbacks);
          setClientFeedback(response.data.feedbacks);
          const filteredrecommend = response.data.recommended.filter(
            (el) => el.id !== Number(id)
          );
          setRecommended(filteredrecommend);
        })
        .catch((error) => console.log(error))
        .finally(() => {
          setLoading(false);
        });
    };
    if (id) fetchDetails();
  }, [id, state.id]);

  const deleteFeedBack = (feedbackId, productId, index) => {
    axios
      .post(`http://localhost:2000/feedback/delete`, {
        feedbackId: feedbackId,
        productId: productId,
      })
      .then(() => {
        const filtered = clientFeedback.filter(
          (el) => el.feedbackId !== feedbackId
        );
        setClientFeedback([...filtered]);
      });
  };
  return (
    <div className="product_details">
      <div className="product_details_container">
        <img src={ProductImage} alt="product_image" className="details_image" />
        <div className="details_product_info">
          <span className="details_name">{details.product} </span>
          <Rating rate={details.rating} className="details_rating" />
          <div className="details_description">
            {details.productDescription}
          </div>
          <span className="details_price"> Rs.{details.price} </span>
          <div className="details_button_group">
            <WishlistButton product={details} />
            <button onClick={() => dispatch({ type: "ADD", payload: details })}>
              <b className="wishlist_button">
                <ShoppingCartSharp /> Add to cart
              </b>
            </button>
          </div>
        </div>
      </div>
      <div className="details_reccomendation">Recommended for you </div>
      <div className="recommended_product">
        {recommended.map((recco) => (
          <SingleItem product={recco} />
        ))}
      </div>
      <div className="feedback_section">
        <b>Send Your Feedback </b>
        <Feedback
          productId={details.id}
          setClientFeedback={setClientFeedback}
          clientFeedback={clientFeedback}
        />
        {clientFeedback.length > 0 &&
          clientFeedback.map((feedback, index) => (
            <div className="customer_reviews" key={index}>
              <div className="customer_info">
                <span className="reviewer_name">
                  <Avatar className="reviewer_avatar">
                    {feedback.firstName[0]|| 'D' }
                  </Avatar>
                  {feedback.firstName||'D'}
                </span>
                <Rating rate={feedback.rating} />
                <span className="reviewer_feedback"> {feedback.feedback}</span>
              </div>
              {feedback.userId === state.id && (
                <button className="review_delete_button"
                  onClick={() =>deleteFeedBack(
                      feedback.feedbackId,
                      feedback.productId,
                      index
                    )
                  }
                >
                <SpeakerNotesOff/>
                </button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default ProductDetails;
