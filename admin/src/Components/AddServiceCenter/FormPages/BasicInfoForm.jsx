import React, { useContext, useState } from "react";
import upload_area from "../../../assets/upload_area.svg";

export const BasicInfoForm = ({
  serviceCenterDetails,
  image,
  setImage,
  handleInputChange,
}) => {
  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="basic-info-form">
      <h3>BASIC DETAILS</h3>
      <div className="add-service-center-itemfield">
        <p>Service Center Name</p>
        <input
          value={serviceCenterDetails.name}
          onChange={handleInputChange}
          type="text"
          name="name"
          placeholder="Type here"
        />
      </div>

      <div className="add-service-center-itemfield">
        <p>Description</p>
        <textarea
          value={serviceCenterDetails.description}
          onChange={handleInputChange}
          type="text"
          name="description"
          placeholder="Type here"
          // maxLength="150"
        />
      </div>

      <div className="add-service-center-itemfield">
        <p>Service Center Category</p>
        <select
          value={serviceCenterDetails.category}
          onChange={handleInputChange}
          name="category"
          className="add-service-center-selector"
        >
          <option value="automotive">Automotive</option>
          <option value="electronics_and_appliances">
            Electronics and Appliances
          </option>
          <option value="it_and_technology">IT and Technology</option>
          <option value="specialty_services_healthtech">
            Specialty Services (HealthTech)
          </option>
          <option value="consumer_goods">Consumer Goods</option>
          <option value="others">Others</option>
        </select>
      </div>

      <div className="add-service-center-itemfield">
        <p>Service Center's Image</p>
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            className="addproduct-thumnail-img"
            alt=""
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>
    </div>
  );
};
