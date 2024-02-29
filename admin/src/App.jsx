import React from "react";
import { Navbar } from "./Components/Navbar/Navbar";
import { Footer } from "./Components/Footer/Footer";
import { Admin } from "./Pages/Admin/Admin";

const App = () => {
  return (
    <div>
      <Navbar />
      <Admin />
      <Footer />
    </div>
  );
};

export default App;
