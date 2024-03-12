import React from "react";
import { Link } from "react-router-dom";
import add_product_icon from "../Assets/Product_Cart.svg";
import list_product_icon from "../Assets/Product_list_icon.svg";

export const Sidebar = () => {
  return (
    <div className="sidebar admin-upper">
      <Link to={"/addservicecenter"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item link">
          <img src={add_product_icon} alt="" />
          <p>Add Service Center</p>
        </div>
      </Link>

      <Link to={"/listservicecenter"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item link">
          <img src={list_product_icon} alt="" />
          <p>Service Center List</p>
        </div>
      </Link>
    </div>
  );
};
