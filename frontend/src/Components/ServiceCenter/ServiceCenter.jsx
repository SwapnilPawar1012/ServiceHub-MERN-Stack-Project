import React, { useContext } from "react";
import "./ServiceCenter.css";
import all_service_centers from "../Assets/all_service_centers";
import { ServiceCenterDisplay } from "../ServiceCenterDisplay/ServiceCenterDisplay";
import { ServiceCenterContext } from "../../Context/ServiceCenterContext";
import { useParams } from "react-router-dom";

export const ServiceCenter = () => {
  // const { all_service_centers } = useContext(ServiceCenterContext);
  const { service_centerID } = useParams();
  const service_center = all_service_centers.find(
    (e) => e.id === Number(service_centerID)
  );
  // alert(service_center.name);

  return (
    <div className="service-center">
      <ServiceCenterDisplay service_center={service_center} />
    </div>
  );
};
