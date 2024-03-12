import React from "react";
import { ReviewCartItem } from "./ReviewCardItem";

export const ReviewsAndRatings = (props) => {
  const { service_center } = props;

  return (
    <div>
      <ReviewCartItem service_center={service_center} />
    </div>
  );
};
