import React from "react";
import profileImg from "../../Assets/computer1.avif";

export const RatingsAndReviewAdmin = ({ ratings, reviews }) => {
  return (
    <div className="rating-and-review-admin">
      <div className="ratings">
        <p>
          Total Reviews {"  "} <span>{ratings}</span>
        </p>
      </div>

      <div className="reviews-panel">
        <hr />
        <div className="review">
          <div className="review-left">
            <div className="review-image">
              <img src={profileImg} alt="" />
            </div>
          </div>
          <div className="review-right">
            <div className="review-reviewer">Swapnil</div>
            <div className="review-text">
              <div className="review-rating">{5}</div>
              This Service Center provides best services.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
