import React, { useState, useEffect } from "react";
import "./CSS/ServiceCenterCategory.css";
import { Item } from "../Components/Item";
// import all_service_centers from "../Assets/all_service_centers";

export const ServiceCenterCategory = () => {
  const [all_service_centers, setAllServiceCenters] = useState([]);
  // console.log("all_service_centers " + all_service_centers);

  const fetchInfo = async () => {
    await fetch("http://localhost:4000/allservicecenters")
      .then((resp) => resp.json())
      .then((data) => {
        setAllServiceCenters(data);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className="service-center-category">
      <div className="service-center-category-indexSort">
        <p>
          <span>Showing 1-12</span> out of 36
        </p>
      </div>

      <div className="service-center-category-services">
        {Array.isArray(all_service_centers) ? (
          all_service_centers.map((item, i) => (
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
          ))
        ) : (
          // Render something else or nothing if all_service_centers is not an array
          <div>No services found</div>
        )}
      </div>
    </div>
  );
};
