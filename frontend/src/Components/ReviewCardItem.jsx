import React, { useState } from "react";
import star_icon from "../Assets/star.svg";
import carousel_icon from "../Assets/icons/play.svg";
// import previous_icon from "../Assets/icons/previous.svg";
// import next_icon from "../Assets/icons/next.svg";

export const ReviewCartItem = (props) => {
  const { service_center } = props;

  function Stars({ ratings }) {
    const stars = [];

    for (let i = 0; i < ratings; i++) {
      stars.push(<img className="card-star-icon" src={star_icon} alt="" />);
    }
    return <div className="stars card-stars">{stars}</div>;
  }

  // State to keep track of the current index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handler for the "Next" button click
  const handleNext = () => {
    // Ensure we don't go past the end of the reviews array
    if (currentIndex < service_center.reviews.length - 3) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Handler for the "Previous" button click
  const handlePrevious = () => {
    // Ensure we don't go below 0
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Calculate the reviews to be displayed
  const displayedReviews = service_center.reviews.slice(
    currentIndex,
    currentIndex + 3
  );

  return (
    <div className="review-card-item">
      <h2 className="review-card-item-heading">Customer Reviews</h2>
      <hr />
      <div>
        {service_center.ratings > 0 ? (
          <div>
            <div className="card-item-container">
              <div className="carousel-click-img">
                <img
                  className="img previous-img"
                  src={carousel_icon}
                  alt=""
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                />
              </div>
              {displayedReviews.map((review, index) => (
                <div className="card-item" key={index}>
                  <p className="card-item-heading">{review.reviewer}</p>
                  <p>
                    {/* Assuming Stars is a correctly implemented component for displaying star ratings */}
                    <Stars ratings={review.rating} />
                  </p>
                  <p className="card-item-reviewText">{review.reviewText}</p>
                </div>
              ))}
              <div className="carousel-click-img">
                <img
                  className="img next-img"
                  src={carousel_icon}
                  alt=""
                  onClick={handleNext}
                  disabled={currentIndex >= service_center.reviews.length - 3}
                />
              </div>
            </div>
          </div>
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};
