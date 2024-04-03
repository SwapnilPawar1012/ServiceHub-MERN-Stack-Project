import React from "react";
import "./App.css";
import { Navbar } from "./Components/Navbar";
import { Footer } from "./Components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home";
import { ServiceCenterCategory } from "./Pages/ServiceCenterCategory";
import { ServiceCenter } from "./Components/ServiceCenter";
import { Admin } from "./Pages/Admin";
import { LoginSignup } from "./Pages/LoginSignup";
import { AddServiceCenter } from "./Components/Admin/AddServiceCenter";
import { ListServiceCenter } from "./Components/Admin/ListServiceCenter";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/loginsignup" element={<LoginSignup />} />
          <Route path="/addservicecenter" element={<AddServiceCenter />} />
          <Route path="/listservicecenter" element={<ListServiceCenter />} />
          {/** Mojar Category Service Centers Related Routes */}
          <Route path="/" element={<ServiceCenterCategory />} />
          <Route path="/electonics_and_appliances" />
          <Route path="/it_and_technology" />
          <Route path="/specialty" /> {/* Medical Equipments and Fitness */}
          <Route path="/consumergoods" />{" "}
          {/* Watches, Jewelry, Furnituer and Home Decor */}
          <Route path="/others" />{" "}
          {/* Bicycle, Educational and Musical Instruments */}
          {/** Minor Category Service Centers Related Routes */}
          {/* <Route path="/carrepair_and_maintenance" />
          <Route path="/twowheelerservicestations" />
          <Route path="/mobilephones_and_tablets" />
          <Route path="/computer_and_laptop" />
          <Route path="/consumerelectronics" />
          <Route path="/homeappliances" />
          <Route path="/networking_and_it" />
          <Route path="/software_and_application" />
          <Route path="/medicalequipment" />
          <Route path="/fitnessequipment" />
          <Route path="/watches_and_jewelry" />
          <Route path="/furniture_and_homedecor" />
          <Route path="/bicycle" />
          <Route path="/educational_and_musicalinstruments" /> */}
          {/** Developments Related Routes */}
          {/* <Route path="/about" />
          <Route path="/contact" />
          <Route path="/developers" />
          <Route path="/privacypolicies" /> */}
          <Route path="/service_center" element={<ServiceCenter />}>
            <Route path=":service_centerID" element={<ServiceCenter />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
