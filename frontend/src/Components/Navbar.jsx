import React from "react";
import logo from "../Assets/logo.svg";
import user_profile_icon from "../Assets/user_profile.svg";
import { Admin } from "../Pages/Admin";
import { Home } from "../Pages/Home";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export const Navbar = () => {
  const { adminPanelStatus, loginStatus, isAuthenticated, isAdminPanel } =
    useAuth();

  const handleAdminClick = () => {
    adminPanelStatus(true);
    return <Admin />;
  };

  const handleHomeClick = () => {
    adminPanelStatus(false);
    return <Home />;
  };

  const handleLogOut = () => {
    localStorage.removeItem("auth-token"); // Remove the token
    loginStatus(false);
  };

  return (
    <div className="navbar">
      <div className="nav-logo logo">
        <img className="logo" src={logo} alt="" />
        <p className="logo-name">ServiceHUB</p>
      </div>

      <div className="nav-login-profile">
        {/* Admin and Home Button */}
        {isAdminPanel ? (
          <Link className="nav-admin" to={"/"}>
            <button
              className="nav-btn btn btn-primary"
              onClick={handleHomeClick}
            >
              Home
            </button>
          </Link>
        ) : (
          <Link className="nav-admin" to={"/admin"}>
            <button
              className="nav-btn btn btn-primary"
              onClick={handleAdminClick}
            >
              Admin
            </button>
          </Link>
        )}

        {/* Login and Logout Button */}
        {isAuthenticated ? (
          <Link className="nav-login" to={"/"}>
            <button className="nav-btn btn btn-danger" onClick={handleLogOut}>
              Logout
            </button>
          </Link>
        ) : (
          <Link className="nav-login" to={"/loginsignup"}>
            <button className="nav-btn btn btn-danger">Login</button>
          </Link>
        )}

        <div className="nav-profile">
          <img className="nav-profile_icon" src={user_profile_icon} alt="" />
        </div>
      </div>
    </div>
  );
};
