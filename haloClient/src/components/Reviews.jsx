import React, { useState } from "react";
import "./Css/Review.css";
import reviewImg from "../images/delivery-vector-graphics-computer-icons-clip-art-illustration-delivery-man-bd38cd1945ea8a2acb0e34ff1d63b1a8.png";

const rawReviews = [
  {
    img:reviewImg,
    review:
      "This the best Food delivery system I have ever seen they are just incomparable in terms of their quality of services and food.",
  },
  {
    img: reviewImg,
      review: `Since I am enterpreneur and don't have much time for cooking I always look forward to these guys  `,
  },
  {
    img:reviewImg,
        review: `Excellent food sevice and The best in overall Nepal>Can't express my thanks with my words`,
  },
];
function Reviews() {
  const [reviews] = useState(rawReviews);

  return (
    <div className="reviews">
      {reviews.map((review) => (
        <div className="review">
          <div className="review_img_wrapper">
            
            <img src={reviewImg} alt="review_img" className="review_img"/>
          </div>

          <div classname="review_text"><blockquote> {review.review} </blockquote></div>
        </div>
      ))}
    </div>
  );
}

export default Reviews;
