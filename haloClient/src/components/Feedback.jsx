import { Star, StarBorder } from "@material-ui/icons";
import axios from "axios";
import React, { useState } from "react";
import { ProductState } from "../Context/Context";
import './Css/Feedback.css'
function Feedback({ userId, productId, setClientFeedback, clientFeedback }) {
  const { state } = ProductState();
  const [feedbackText, setFeedbackText] = useState("");
  const [rating, setRating] = useState(0);
  const sendFeedback = (e) => {
    e.preventDefault();

    const feedback = {
      feedback: feedbackText,
      rating: rating,
      userId: state.id,
      productId: productId,
      firstName:state.userName
    };

    axios
      .post("http://localhost:2000/feedback", feedback)
      .then((response) => {
      })
      .finally(() => {
        setFeedbackText("");

        setClientFeedback([feedback,...clientFeedback]);

        setRating(0);
      });
  };
  return (
    <div className="feedback">
      <form className="feedback_form" onSubmit={sendFeedback}>
      <div className="feedback_star_container">
      
          {[...Array(5)]?.map((_, i) => (
            <div
              className="feedback_star_cover"
              onClick={() => setRating(i + 1)}
              key={i}
            >
                
                {rating > i ?  <Star className="feedback_star" /> : <StarBorder className="feedback_star" />}
              
            </div>
          ))}
    </div>

        <textarea  className="feedback_input"
          onChange={(e) => setFeedbackText(e.target.value)}
          value={feedbackText}
        />
        <button
        className="feedback_post_button"
          type="submit"
          disabled={(rating < 1 && !feedbackText) || !state.id}
        >
          post
        </button>
      </form>

    </div>
  );
}

export default Feedback;
