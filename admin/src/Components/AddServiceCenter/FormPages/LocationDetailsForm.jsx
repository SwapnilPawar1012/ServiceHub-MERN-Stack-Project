import React from "react";

export const LocationDetailsForm = ({
  serviceCenterDetails,
  handleInputChange,
  handleNestedInputChange,
}) => {
  return (
    <div className="location-details-form">
      <h3>LOCATION DETAILS</h3>
      <div className="add-service-center-itemfield">
        <p>Service Center's Address</p>
        <input
          value={serviceCenterDetails.address}
          onChange={handleInputChange}
          type="text"
          name="address"
          placeholder="Type here"
          maxLength="80"
        />
      </div>

      <div className="add-service-center-location">
        <div className="add-service-center-itemfield">
          <p>Latitude</p>
          <input
            value={serviceCenterDetails.location.latitude}
            onChange={handleNestedInputChange}
            type="text"
            name="location.latitude"
            placeholder="Type here"
            // maxLength="15"
          />
        </div>
        <div className="add-service-center-itemfield">
          <p>Longitude</p>
          <input
            value={serviceCenterDetails.location.longitude}
            onChange={handleNestedInputChange}
            type="text"
            name="location.longitude"
            placeholder="Type here"
            // maxLength="15"
          />
        </div>
      </div>
    </div>
  );
};
