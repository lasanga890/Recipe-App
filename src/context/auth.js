import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Check for a token to determine authentication
  return token ? children : <Navigate to="/" />; // Redirect to login if not authenticated
};

export default ProtectedRoute;
