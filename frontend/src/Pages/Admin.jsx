import React from "react";
import "./CSS/Admin.css";
import { Sidebar } from "../Components/Admin/Sidebar";
import { useAuth } from "../Context/AuthContext";

export const Admin = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    <div className="admin">
      <Sidebar />
    </div>
  ) : (
    <div>
      <h1>You are not Admin yet.</h1>
      <h2>To become an Admin Register or Login.</h2>
    </div>
  );
};
