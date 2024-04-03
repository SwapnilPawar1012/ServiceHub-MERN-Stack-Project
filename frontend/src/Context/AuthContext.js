import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdminPanel, setIsAdminPanel] = useState(false);

  // Mock function to "log in" and "log out" for demonstration purposes
  const loginStatus = (status) => {
    setIsAuthenticated(status);
  };

  const adminPanelStatus = (status) => {
    setIsAdminPanel(status);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isAdminPanel,
        loginStatus,
        adminPanelStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
