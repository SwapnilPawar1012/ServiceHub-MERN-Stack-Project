import React, { useState, useEffect } from "react";
// import all_service_centers from "../Assets/all_service_centers";
import { useParams } from "react-router-dom";
import { ServiceCenterDetails } from "./ServiceCenterDetails";
import { GoogleMapDisplay } from "./GoogleMapDisplay";
import { ReviewsAndRatings } from "./ReviewsAndRatings";
import { RatingsAndReviewForm } from "./Users/RatingsAndReviewForm";

export const ServiceCenter = () => {
  // State to hold the fetched service center data
  // Initialized to null, indicating data is not yet fetched or is unavailable
  const [serviceCenter, setServiceCenter] = useState(null);
  console.log(
    "serviceCenter : " +
      JSON.stringify(serviceCenter?.operatingHours?.workingDays)
  );
  const name = serviceCenter?.name;
  const description = serviceCenter?.description;
  const category = serviceCenter?.category;
  const image = serviceCenter?.image;
  const address = serviceCenter?.address;
  const servicesOffered = serviceCenter?.servicesOffered;
  const verificationStatus = serviceCenter?.verificationStatus;
  const locationLatitude = serviceCenter?.location?.latitude;
  const locationLongitude = serviceCenter?.location?.longitude;
  const operatingHoursWorkingDays = serviceCenter?.operatingHours?.workingDays;
  const operatingHoursNonWorkingDays =
    serviceCenter?.operatingHours?.nonWorkingDays;
  const contact = serviceCenter?.contact;
  const ratings = serviceCenter?.ratings;
  const reviews = serviceCenter?.reviews;

  // console.log(contact.email);

  // Extracting the service center ID from URL parameters
  const { service_centerID } = useParams();

  useEffect(() => {
    console.log("Fetching service center data");

    const fetchServiceCenter = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/servicecenterdata/${service_centerID}`
        );
        const data = await response.json();

        console.log("Fetched data: ", data);
        setServiceCenter(data); // Directly store the data object
      } catch (error) {
        console.error("Error fetching service center details:", error);
      }
    };

    fetchServiceCenter();
  }, [service_centerID]); // Effect dependency on service_centerID

  return (
    <div className="service-center">
      {serviceCenter ? (
        <div className="service-center-display">
          {/* <img
          className="service-center-details-main-img"
          src={service_center}
          alt=""
        /> */}
          <div className="service-center-display-upper">
            <div className="service-center-display-left">
              <ServiceCenterDetails
                image={image}
                name={name}
                description={description}
                category={category}
                address={address}
                verificationStatus={verificationStatus}
                servicesOffered={servicesOffered}
                locationLatitude={locationLatitude}
                locationLongitude={locationLongitude}
                operatingHoursWorkingDays={operatingHoursWorkingDays}
                operatingHoursNonWorkingDays={operatingHoursNonWorkingDays}
                contact={contact}
              />
            </div>
            <div className="service-center-display-right">
              <p className="service-center-display-right-heading">Google Map</p>
              <a
                className="link"
                href={`https://www.google.com/maps?q=${locationLatitude},${locationLongitude}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="service-center-display-right-upper-map">
                  <GoogleMapDisplay
                    locationLatitude={locationLatitude}
                    locationLongitude={locationLongitude}
                  />
                </div>
              </a>
            </div>
          </div>
          <div className="service-center-display-lower">
            <RatingsAndReviewForm />
            <ReviewsAndRatings ratings={ratings} reviews={reviews} />
          </div>
        </div>
      ) : (
        <div>Loading service center details...</div>
      )}
    </div>
  );
};
