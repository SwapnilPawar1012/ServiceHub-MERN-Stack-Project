import React from "react";
import "./Admin.css";
import { Routes, Route } from "react-router-dom";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import { AddServiceCenter } from "../../Components/AddServiceCenter/AddServiceCenter";
import { ListServiceCenter } from "../../Components/ListServiceCenter/ListServiceCenter";

export const Admin = () => {
  return (
    <div className="admin">
      <Sidebar />

      <Routes>
        <Route path="/addservicecenter" element={<AddServiceCenter />} />
        <Route path="/listservicecenter" element={<ListServiceCenter />} />
      </Routes>
    </div>
  );
};
