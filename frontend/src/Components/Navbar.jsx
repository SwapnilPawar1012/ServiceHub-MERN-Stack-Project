import React from "react";
import logo from "../Assets/logo.svg";
import user_profile_icon from "../Assets/user_profile.svg";
import { Admin } from "../Pages/Admin";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const handleAdminClick = () => {
    return <Admin />;
  };
  return (
    <div className="navbar">
      <div className="nav-logo logo">
        <img className="logo" src={logo} alt="" />
        <p className="logo-name">ServiceHUB</p>
      </div>
      <div className="nav-login-profile">
        <Link className="nav-admin" to={"/admin"}>
          <button
            className="nav-btn btn btn-primary"
            onClick={handleAdminClick}
          >
            Admin
          </button>
        </Link>
        <Link className="nav-login" to={"/loginsignup"}>
          <button className="nav-btn btn btn-danger">Login</button>
        </Link>
        <div className="nav-profile">
          <img className="nav-profile_icon" src={user_profile_icon} alt="" />
        </div>
      </div>
    </div>
  );
};
