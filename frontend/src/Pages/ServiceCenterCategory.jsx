import React, {  } from "react";
import "./CSS/ServiceCenterCategory.css";
import { Item } from "../Components/Item/Item";
import all_service_centers from "../Components/Assets/all_service_centers";
// import { ServiceCenterContext } from "../Context/ServiceCenterContext";

export const ServiceCenterCategory = (props) => {
  // const { all_service_centers } = useContext(ServiceCenterContext);

  return (
    <div className="service-center-category">
      <div className="service-center-category-indexSort">
        <p>
          <span>Showing 1-12</span> out of 36
        </p>
      </div>

      <div className="service-center-category-services">
        {all_service_centers.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              address={item.address}
              // location={item.location}
              // servicesOffered={item.servicesOffered}
              // contact={item.contact}
              operatingHours={item.operatingHours}
              ratings={item.ratings}
              // reviews={item.reviews}
              verificationStatus={item.verificationStatus}
            />
          );
        })}
      </div>
    </div>
  );
};
