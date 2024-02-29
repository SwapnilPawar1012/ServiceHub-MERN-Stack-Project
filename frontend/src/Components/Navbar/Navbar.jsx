import React from "react";
import "./Navbar.css";
import logo from "../Assets/logo.svg";
import user_profile_icon from "../Assets/user_profile.svg";

export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-logo logo">
        <img className="logo" src={logo} alt="" />
        <p className="logo-name">ServiceHUB</p>
      </div>
      <div className="nav-login-profile">
        <div className="nav-login">
          <button className="btn btn-primary">Login</button>
        </div>
        <div className="nav-profile">
          <img className="nav-profile_icon" src={user_profile_icon} alt="" />
        </div>
      </div>
    </div>
  );
};
