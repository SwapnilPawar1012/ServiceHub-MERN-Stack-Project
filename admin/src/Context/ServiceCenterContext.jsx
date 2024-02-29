import React, { createContext, useContext, useState } from "react";

const FormContext = createContext();

export const useFormContext = () => useContext(FormContext);

export const ServiceCenterContext = () => {
  const [formData, setFormData] = useState({});

  const updateFormData = (newData) => {
    setFormData((prevData) => ({ ...prevData, ...newData }));
  };

  // Session Storage (save the data to session storage)
  const saveFormData = (data) => {
    sessionStorage.setItem("formData", JSON.stringify(data));
  };

  const contextValue = {
    formData,
    updateFormData,
    saveFormData,
  };

  return (
    <ServiceCenterContext.Provider value={contextValue}>
      {children}
    </ServiceCenterContext.Provider>
  );
};
