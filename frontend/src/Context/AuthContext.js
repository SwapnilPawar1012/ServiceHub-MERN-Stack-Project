import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdminPanel, setIsAdminPanel] = useState(false);
  const [isReviewed, setIsReviewed] = useState(false);

  // Mock function to "log in" and "log out" for demonstration purposes
  const loginStatus = (status) => {
    setIsAuthenticated(status);
  };

  const adminPanelStatus = (status) => {
    setIsAdminPanel(status);
  };

  const reviewFormStatus = (status) => {
    setIsReviewed(status);
  };

  const handleAuthentication = () => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      loginStatus(true);
    }
  };

  useEffect(() => {
    handleAuthentication();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isAdminPanel,
        loginStatus,
        adminPanelStatus,
        isReviewed,
        reviewFormStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
