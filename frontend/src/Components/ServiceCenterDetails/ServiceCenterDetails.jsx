import React from "react";
import "./ServiceCenterDetails.css";
import address_icon from "../Assets/icons/address.svg";
import location_icon from "../Assets/icons/location.svg";
import service_offered_icon from "../Assets/icons/toolbox.svg";
import phone_icon from "../Assets/icons/phone.svg";
import email_icon from "../Assets/icons/envelope.svg";
import website_icon from "../Assets/icons/globe.svg";
import verification_status_icon from "../Assets/icons/patch-check.svg";
import door_open_icon from "../Assets/icons/door-open.svg";
import door_closed_icon from "../Assets/icons/door-closed.svg";

export const ServiceCenterDetails = (props) => {
  const { service_center } = props;

  function verificationStatus(status) {
    if (status === "Verified") {
      return <span style={{ color: "green" }}>Verified</span>;
    } else if (status === "Pending") {
      return <span style={{ color: "orange" }}>Verification Pending</span>;
    } else {
      return <span style={{ color: "red" }}>Not Verified</span>;
    }
  }

  function ShopStatus(service_center) {
    // Get current date and time
    const now = new Date();
    const dayOfWeek = now.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
    const hour = now.getHours(); // Get the current hour (0-23)

    // Define shop hours
    const isOpenDay = dayOfWeek >= 1 && dayOfWeek <= 5; // Monday to Friday
    const isOpenHour = hour >= 8 && hour < 22; // 8AM to 10PM (22 in 24-hour format)

    // Determine if the shop is open or closed
    const isOpen = isOpenDay && isOpenHour;

    return (
      <div>
        <h2>Shop Status</h2>
        {isOpen ? (
          <p>We are open! Come visit us.</p>
        ) : (
          <p>We are currently closed.</p>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="service-center-details-left-upper">
        <div className="service-center-details-img">
          <p className="operatingStatus">Open</p>
          <img
            className="service-center-details-main-img"
            src={service_center.image}
            alt=""
          />
        </div>
      </div>

      <div className="service-center-details-left-lower">
        <p className="service-center-details-left-lower-heading">
          {service_center.name}
        </p>

        <p>
          <span>
            <img className="icon" src={verification_status_icon} alt="" />
            {"   "}
          </span>
          {verificationStatus(service_center.verificationStatus)}
        </p>

        <p>
          <span>
            <img className="icon" src={address_icon} alt="" />
            {"   "}
          </span>
          <a
            className="link"
            href={`https://www.google.com/maps?q=${service_center.address}`}
            target="_blank"
          >
            {service_center.address}
          </a>
        </p>

        <p>
          <span>
            <img className="icon" src={location_icon} alt="" />
            {"   "}
          </span>
          <a
            className="link"
            href={`https://www.google.com/maps?q=${service_center.location.latitude},${service_center.location.longitude}`}
            target="_blank"
          >
            {service_center.location.latitude},{" "}
            {service_center.location.longitude}
          </a>
        </p>

        <p>
          <span>
            <img className="icon" src={service_offered_icon} alt="" />
            {"   "}
          </span>
          <span>
            {service_center.servicesOffered.map((item, i) => {
              return (
                <span key={i}>
                  {i === 0 ? "" : ", "}
                  {item}
                </span>
              );
            })}
          </span>
        </p>

        <p>
          <span>
            <img className="icon" src={phone_icon} alt="" />
            {"   "}
          </span>
          {service_center.contact.phone}
        </p>
        <p>
          <span>
            <img className="icon" src={email_icon} alt="" />
            {"   "}
          </span>
          <a className="link" href={service_center.contact.email}>
            {service_center.contact.email}
          </a>
        </p>
        <p>
          <span>
            <img className="icon" src={website_icon} alt="" />
            {"   "}
          </span>
          <a className="link" href={service_center.contact.website}>
            {service_center.contact.website}
          </a>
        </p>

        <div className="operatingHours">
          {service_center.operatingHours.map((item, i) => {
            return (
              <p key={i} className={`operatingHours${i}`}>
                {i === 0 ? (
                  <span>
                    <img className="icon" src={door_open_icon} alt="" />
                  </span>
                ) : (
                  <span>
                    <img className="icon" src={door_closed_icon} alt="" />
                  </span>
                )}
                <p>
                  <span>{item.days}</span> : <span>{item.hours}</span>
                </p>
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};
