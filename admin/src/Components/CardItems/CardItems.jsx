import React from "react";
import "./CardItems.css";

export const CardItems = (props) => {
  return (
    <div className="card-items">
      {/* <div className="card-item"> */}
      <div className="card-item-left">
        <img src={props.image} alt="" />
      </div>
      <div className="card-item-right">
        <div className="card-item-details-basic">
          <h2>{props.name}</h2>
          <p>{props.category}</p>
          <p>{props.description}</p>
        </div>
        <div className="card-item-details-address-location">
          <p>{props.address}</p>
          <p>
            {props.location.latitude} {", "} {props.location.longitude}
          </p>
        </div>
        <div className="card-item-details-services-offered">
          <p>
            {props.servicesOffered.map((service, id) => {
              return id === 0 ? (
                <span key={id}>{service}</span>
              ) : (
                <span key={id}>
                  {", "}
                  {service}
                </span>
              );
            })}
          </p>
        </div>
        <div className="card-item-details-operating-hours">
          <p>
            {props.operatingHours.workingDays.days} {" -> "}{" "}
            {props.operatingHours.workingDays.hours}
          </p>
          <p>{/* {props.operatingHours.nonWorkingDays.days} */}</p>
        </div>
        <div className="card-item-details-contact">
          <p>
            {props.contact.phone.map((number, id) => {
              return id === 0 ? (
                <span key={number}>{number}</span>
              ) : (
                <span key={id}>
                  {", "}
                  {number}
                </span>
              );
            })}
          </p>
          <p>{props.contact.email}</p>
          <p>{props.contact.website}</p>
        </div>
        <div className="card-item-details-ratings-reviews">
          <p>Ratings : {props.ratings}</p>
          <p>Reviews : </p>
        </div>
        <div className="card-item-details-verification-status">
          <p>{props.verificationStatus}</p>
        </div>
        <div className="card-item-details-discounts">
          {props.discounts.map((item, id) => {
            return (
              <div key={id}>
                <p>{item.discountName}</p>
                <p>{item.discountDescription}</p>
                <p>{item.percentageOff}%</p>
                <p>{item.conditions}</p>
                <p>{item.validity.startDays}</p>
                <p>{item.validity.endDays}</p>
              </div>
            );
          })}
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};
