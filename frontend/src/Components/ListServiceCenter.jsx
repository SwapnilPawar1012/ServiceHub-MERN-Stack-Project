import React, { useEffect, useState } from "react";
import { Item } from "./Item";
import { Sidebar } from "./Sidebar";
// import all_service_centers from "../Assets/all_service_centers";

export const ListServiceCenter = () => {
  const [all_service_centers, setAllServiceCenters] = useState([]);

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
    <div className="admin">
      <div className="admin-upper">
        <Sidebar />
      </div>
      <div className="admin-lower">
        <div className="list-service-center">
          {Array.isArray(all_service_centers) ? (
            all_service_centers.map((service, index) => {
              return (
                <Item
                  key={index}
                  id={service.id}
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
            })
          ) : (
            <div>No record found</div>
          )}
        </div>
      </div>
    </div>
  );
};
