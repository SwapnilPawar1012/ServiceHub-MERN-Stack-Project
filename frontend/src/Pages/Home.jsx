import React from "react";
import "./CSS/Home.css";
import { ServiceCenterCategory } from "./ServiceCenterCategory";

export const Home = () => {
  return (
    <div className="home">
      <ServiceCenterCategory />
    </div>
  );
};
