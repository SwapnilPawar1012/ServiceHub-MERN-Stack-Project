import React, { useEffect, useState } from "react";
import { Item } from "../Item";
import { Sidebar } from "../Admin/Sidebar";
import { jwtDecode } from "jwt-decode";
// import all_service_centers from "../Assets/all_service_centers";

export const ListServiceCenter = () => {
  const [all_service_centers, setAllServiceCenters] = useState([]);
  console.log("all : " + all_service_centers);

  const fetchInfo = async () => {
    let decoded;
    const token = localStorage.getItem("auth-token");
    console.log("token name : " + token);
    if (token) {
      decoded = jwtDecode(token);
      console.log(decoded.user._id); // { sub: "1234567890", name: "John Doe", iat: 1516239022, ... }
    }
    await fetch(`http://localhost:4000/listservicecenter/${decoded.user._id}`)
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
