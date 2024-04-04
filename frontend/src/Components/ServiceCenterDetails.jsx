import React from "react";
import address_icon from "../Assets/icons/address.svg";
import location_icon from "../Assets/icons/location.svg";
import service_offered_icon from "../Assets/icons/toolbox.svg";
import phone_icon from "../Assets/icons/phone.svg";
import email_icon from "../Assets/icons/envelope.svg";
import website_icon from "../Assets/icons/globe.svg";
import verification_status_icon from "../Assets/icons/patch-check.svg";
import door_open_icon from "../Assets/icons/door-open.svg";
import door_closed_icon from "../Assets/icons/door-closed.svg";

export const ServiceCenterDetails = ({
  image,
  name,
  description,
  category,
  verificationStatus,
  servicesOffered,
  address,
  locationLatitude,
  locationLongitude,
  operatingHoursWorkingDays,
  operatingHoursNonWorkingDays,
  contact,
}) => {
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
    <div className="service-center-details-left-panel">
      <div className="service-center-details-left-upper">
        <div className="service-center-details-img">
          <p className="operatingStatus">Open</p>
          <img className="service-center-details-main-img" src={image} alt="" />
        </div>
      </div>

      <div className="service-center-details-left-lower">
        <p className="service-center-details-left-lower-heading">{name}</p>

        <p>
          <span>
            <img className="icon" src={verification_status_icon} alt="" />
            {"   "}
          </span>
          {verificationStatus(verificationStatus)}
        </p>

        <p>
          <span>
            <img className="icon" src={verification_status_icon} alt="" />
            {"   "}
          </span>
          {category}
        </p>

        <p>
          <span>
            <img className="icon" src={address_icon} alt="" />
            {"   "}
          </span>
          <a
            className="link"
            href={`https://www.google.com/maps?q=${address}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {address}
          </a>
        </p>

        <p>
          <span>
            <img className="icon" src={verification_status_icon} alt="" />
            {"   "}
          </span>
          {description}
        </p>

        <p>
          <span>
            <img className="icon" src={location_icon} alt="" />
            {"   "}
          </span>
          <a
            className="link"
            href={`https://www.google.com/maps?q=${locationLatitude},${locationLongitude}`}
            target="_blank"
            rel="noreferrer"
          >
            {locationLatitude}, {locationLongitude}
          </a>
        </p>

        <p>
          <span>
            <img className="icon" src={service_offered_icon} alt="" />
            {"   "}
          </span>
          <span>{servicesOffered.map((service) => service).join(", ")}</span>
        </p>

        <p>
          <span>
            <img className="icon" src={phone_icon} alt="" />
            {"   "}
          </span>
          {contact.phone.map((phone) => phone).join(", ")}
        </p>
        <p>
          <span>
            <img className="icon" src={email_icon} alt="" />
            {"   "}
          </span>
          <a className="link" href={contact.email}>
            {contact.email}
          </a>
        </p>
        <p>
          <span>
            <img className="icon" src={website_icon} alt="" />
            {"   "}
          </span>
          <a className="link" href={contact.website}>
            {contact.website}
          </a>
        </p>

        <p>
          <span>
            <img className="icon" src={door_open_icon} alt="" />
          </span>
          <span>{operatingHoursWorkingDays.days}</span> :{" "}
          <span>{operatingHoursWorkingDays.hours}</span>
        </p>
        <div className="operatingHours">
          <p>
            <span>
              <img className="icon" src={door_closed_icon} alt="" />
            </span>
            <span>{operatingHoursNonWorkingDays.days}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
