import React from "react";
import star_icon from "../Assets/star.svg";
import { Link } from "react-router-dom";

export const Item = (props) => {
  // console.log(props);
  function Stars({ ratings }) {
    const stars = [];

    for (let i = 0; i < ratings; i++) {
      stars.push(<img className="item-star-icon" src={star_icon} alt="" />);
    }
    return <div className="stars">{stars}</div>;
  }

  function TextWithLimit({ text, limit }) {
    // Truncate the text to 'limit' characters and append '...'
    const limitedText =
      text.length > limit ? text.substring(0, limit) + "..." : text;

    return <span>{limitedText}</span>;
  }

  return (
    <div className="item">
      <Link className="link" to={`/service_center/${props.id}`}>
        <div>
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
            <p>
              <TextWithLimit text={props.address} limit={50} />
            </p>
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
              <Stars ratings={props.ratings || 5} />({props.ratings})
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
