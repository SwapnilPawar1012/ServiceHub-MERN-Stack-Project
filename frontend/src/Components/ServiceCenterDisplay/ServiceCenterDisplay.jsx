import React from "react";
import "./ServiceCenterDisplay.css";
import { ServiceCenterDetails } from "../ServiceCenterDetails/ServiceCenterDetails";
import { GoogleMapDisplay } from "../GoogleMapDisplay/GoogleMapDisplay";
import { ReviewsAndRatings } from "../ReviewsAndRatings/ReviewsAndRatings";

export const ServiceCenterDisplay = (props) => {
  const { service_center } = props;
  // alert(service_center.id);

  return (
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
          >
            <div className="service-center-display-right-upper">
              <GoogleMapDisplay service_center={service_center} />
            </div>
          </a>
        </div>
      </div>
      <div className="service-center-display-lower">
        <ReviewsAndRatings service_center={service_center} />
      </div>
    </div>
  );
};
