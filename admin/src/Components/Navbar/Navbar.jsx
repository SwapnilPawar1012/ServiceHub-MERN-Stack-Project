import React from "react";
import "./Navbar.css";
import logo from "../../assets/logo.svg";
import user_profile_icon from "../../assets/user_profile.svg";

export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-logo logo">
        <img className="logo" src={logo} alt="" />
        <p className="logo-name">ServiceHUB</p>
      </div>
      <div className="nav-login-profile">
        <div className="nav-login">
          <button className="nav-btn btn btn-primary">Login</button>
        </div>
        <div className="nav-profile">
          <img className="nav-profile_icon" src={user_profile_icon} alt="" />
        </div>
      </div>
    </div>
  );
};
