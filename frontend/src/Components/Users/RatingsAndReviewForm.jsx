import React, { useState } from "react";
import star_icon from "../../Assets/star.svg";
import rating_star_icon from "../../Assets/rating-star.svg";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const RatingsAndReviewForm = ({ service_centerID }) => {
  const navigate = useNavigate();
  const { isAuthenticated, reviewFormStatus } = useAuth();
  const [reviewData, setReviewData] = useState({
    reviewerId: "",
    serviceCenterID: "",
    reviewText: "",
    rating: 0,
  });
  console.log(reviewData);

  const handleServiceCenterData = async (token, serviceCenterID) => {
    try {
      const response = await fetch(
        `http://localhost:4000/addservicecenterreview/${serviceCenterID}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "auth-token": token,
          },
          body: JSON.stringify(reviewData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = await response.json();
      if (data.success) {
        reviewFormStatus(true);
        console.log(data.message);
      } else {
        console.log("Failed to add review to ServiceCenter");
      }
    } catch (error) {
      console.error("Failed to fetch:", error);
    }
  };

  const handleUserData = async (token, userID) => {
    try {
      const response = await fetch(
        `http://localhost:4000/adduserreview/${userID}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "auth-token": token,
          },
          body: JSON.stringify(reviewData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = await response.json();
      if (data.success) {
        reviewFormStatus(true);
        console.log(data.message);
      } else {
        alert("Failed to add review ServiceCenter");
      }
    } catch (error) {
      console.error("Failed to fetch:", error);
    }
  };

  // Add ratings and reviews form data into mondoDB
  const handleRatingsAndReviewFormSubmit = async () => {
    let decoded;
    const token = localStorage.getItem("auth-token");
    if (token) {
      decoded = jwtDecode(token);
      handleServiceCenterData(token, service_centerID);
      handleUserData(token, decoded.user._id);
    }
  };

  const handleStarClick = (index) => {
    setReviewData((prevState) => ({
      ...prevState,
      rating: index + 1,
    }));
    // console.log("Star clicked:", index + 1);
  };

  const handleUserID = () => {
    if (isAuthenticated) {
      let decoded;
      const token = localStorage.getItem("auth-token");
      if (token) {
        decoded = jwtDecode(token);
        const userID = decoded.user._id;

        setReviewData((prevState) => ({
          ...prevState,
          reviewerId: userID,
          serviceCenterID: service_centerID,
        }));
      }
    } else {
      alert("Login now to give review and rating.");
      navigate("/loginsignup");
    }
  };

  return (
    <div className="ratings-reviews-form">
      <form onClick={handleUserID}>
        <label>
          <span>Select your rating</span>
          <div className="stars">
            {[...Array(5)].map((_, index) => (
              <img
                key={index}
                src={index < reviewData.rating ? rating_star_icon : star_icon} // Choose icon based on whether index is less than rating
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
              name="reviewText"
              maxLength="100"
              rows="2"
              placeholder="Type here"
              onChange={(e) =>
                setReviewData((prevState) => ({
                  ...prevState,
                  reviewText: e.target.value,
                }))
              }
            />
          </div>
        </label>
        <button
          type="button"
          className="btn btn-primary rating-btn"
          onClick={handleRatingsAndReviewFormSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};
