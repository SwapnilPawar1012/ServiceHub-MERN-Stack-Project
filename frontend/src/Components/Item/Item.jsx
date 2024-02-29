import React from "react";
import "./Item.css";
import star_icon from "../Assets/star.svg";
import { Link } from "react-router-dom";

export const Item = (props) => {
  function Stars({ ratings }) {
    const stars = [];

    for (let i = 0; i < ratings; i++) {
      stars.push(<img className="item-star-icon" src={star_icon} alt="" />);
    }
    return <div className="stars">{stars}</div>;
  }

  return (
    <div className="item">
      <Link className="link" to={`/service_center/${props.id}`}>
        <div className="item-container">
          <div className="item-img-verificationStatus">
            {/* <p className="item-verification-status">{props.verificationStatus}</p> */}
            <img
              className="item-img"
              onClick={window.scrollTo(0, 0)}
              src={props.image}
              alt=""
            />
          </div>
          <div className="item-details">
            <p className="item-heading">{props.name}</p>
            <p>{props.address}</p>
            <div>
              {/* {props.operatingHours.map((item, i) => {
                return (
                  <div key={i}>
                    <span>{item.days}</span> : <span>{item.hours}</span>
                  </div>
                );
              })} */}
            </div>
            <div className="item-ratings">
              <Stars ratings={props.ratings} />({props.ratings})
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
