import React from "react";
import all_service_centers from "../Assets/all_service_centers";
import { useParams } from "react-router-dom";
import { ServiceCenterDetails } from "./ServiceCenterDetails";
import { GoogleMapDisplay } from "./GoogleMapDisplay";
import { ReviewsAndRatings } from "./ReviewsAndRatings";
import { RatingsAndReviewForm } from "./RatingsAndReviewForm";

export const ServiceCenter = () => {
  const { service_centerID } = useParams();
  const service_center = all_service_centers.find(
    (e) => e.id === Number(service_centerID)
  );

  return (
    <div className="service-center">
      <div className="service-center-display">
        <div className="service-center-display-upper">
          <div className="service-center-display-left">
            <ServiceCenterDetails service_center={service_center} />
          </div>
          <div className="service-center-display-right">
            <p className="service-center-display-right-heading">Google Map</p>
            <a
              className="link"
              href={`https://www.google.com/maps?q=${service_center.location.latitude},${service_center.location.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="service-center-display-right-upper-map">
                <GoogleMapDisplay service_center={service_center} />
              </div>
            </a>
          </div>
        </div>
        <div className="service-center-display-lower">
          <RatingsAndReviewForm service_center={service_center} />
          <ReviewsAndRatings service_center={service_center} />
        </div>
      </div>
    </div>
  );
};
