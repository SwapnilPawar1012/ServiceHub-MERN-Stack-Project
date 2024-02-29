import React from "react";
import "./Footer.css";
import logo from "../Assets/logo.svg";
import facebook_icon from "../Assets/facebook.svg";
import instagram_icon from "../Assets/instagram.svg";
import linkedin_icon from "../Assets/linkedin.svg";
import x_twitter_icon from "../Assets/x-twitter.svg";
import whatsapp_icon from "../Assets/whatsapp.svg";

export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-logo logo">
        <img className="logo" src={logo} alt="" />
        <p className="logo-name">ServiceHUB</p>
      </div>
      <ul className="footer-links">
        <li>Company</li>
        <li>About</li>
        <li>Contact</li>
        <li>Developers</li>
        <li>Privacy Policies</li>
      </ul>
      <div className="footer-social-icons">
        <div className="footer-icons-container">
          <img src={facebook_icon} alt="" />
        </div>
        <div className="footer-icons-container">
          <img src={instagram_icon} alt="" />
        </div>
        <div className="footer-icons-container">
          <img src={linkedin_icon} alt="" />
        </div>
        <div className="footer-icons-container">
          <img src={x_twitter_icon} alt="" />
        </div>
        <div className="footer-icons-container">
          <img src={whatsapp_icon} alt="" />
        </div>
      </div>
      <div className="footer-copyright">
        <hr />
        <p> Copyright @ 2024 - All Rights Reserved.</p>
      </div>
    </div>
  );
};
