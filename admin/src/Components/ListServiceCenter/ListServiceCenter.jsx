import React from "react";
import "./ListServiceCenter.css";
import all_service_centers from "../../assets/all_service_centers";
import { CardItems } from "../CardItems/CardItems";

export const ListServiceCenter = () => {
  return (
    <div className="list-service-center">
      {all_service_centers.map((service, index) => {
        return (
          <CardItems
            key={index}
            name={service.name}
            description={service.description}
            image={service.image}
            category={service.category}
            address={service.address}
            location={service.location}
            servicesOffered={service.servicesOffered}
            operatingHours={service.operatingHours}
            contact={service.contact}
            ratings={service.ratings}
            reviews={service.reviews}
            verificationStatus={service.verificationStatus}
            discounts={service.discounts}
          />
        );
      })}
    </div>
  );
};
