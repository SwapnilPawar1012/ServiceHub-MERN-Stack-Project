import React from "react";
import "./ReviewsAndRatings.css";
import { ReviewCartItem } from "../ReviewCardItem/ReviewCardItem";

export const ReviewsAndRatings = (props) => {
  const { service_center } = props;

  return (
    <div>
      <ReviewCartItem service_center={service_center} />
    </div>
  );
};
