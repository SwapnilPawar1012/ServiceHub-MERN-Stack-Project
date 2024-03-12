import React, { useEffect, useState } from "react";
import star_icon from "../Assets/star.svg";
import rating_star_icon from "../Assets/rating-star.svg";

export const RatingsAndReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");

  // Add ratings and reviews form data into mondoDB
  const handleRatingsAndReviewForm = () => {
    console.log("rating " + rating);
    console.log("description " + description);
  };

  const handleStarClick = (index) => {
    setRating(index + 1);
    console.log("Star clicked:", index + 1);
  };

  return (
    <div className="ratings-reviews-form">
      <form onClick={handleRatingsAndReviewForm}>
        <label>
          <span>Select your rating</span>
          <div className="stars">
            {[...Array(5)].map((_, index) => (
              <img
                key={index}
                src={index < rating ? rating_star_icon : star_icon} // Choose icon based on whether index is less than rating
                alt={`Rating ${index + 1} Star`}
                onClick={() => handleStarClick(index)}
                className="rating-review-form-star-icons"
              />
            ))}
          </div>
        </label>
        <label>
          <span>Description</span>
          <div>
            <textarea
              type="text"
              name="description"
              maxLength="100"
              rows="2"
              placeholder="Type here"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </label>
        <button
          type="button"
          className="btn btn-primary rating-btn"
          onClick={handleRatingsAndReviewForm}
        >
          Submit
        </button>
      </form>
    </div>
  );
};
