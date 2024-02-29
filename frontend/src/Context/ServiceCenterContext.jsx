import React, { useState, createContext, useEffect } from "react";
import all_service_centers from "../Components/Assets/all_service_centers";

export const ServiceCenterContext = createContext(null);

const ServiceCenterContextProvider = (props) => {
  // const [all_service_centers, setAll_ServiceCenters] = useState([]);

  useEffect(() => {
    // fetch("http://localhost:4000/allproducts")
    //   .then((response) => response.json())
    //   .then((data) => setAll_ServiceCenters(data));
    // setAll_ServiceCenters(all_service_center);
  }, []);

  const contextValue = {
    all_service_centers,
  };

  return (
    <ServiceCenterContext.Provider value={contextValue}>
      {props.children}
    </ServiceCenterContext.Provider>
  );
};

export default ServiceCenterContextProvider;
