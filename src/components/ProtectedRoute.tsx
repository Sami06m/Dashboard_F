import { Navigate } from "react-router-dom";
import React from "react";

const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const loggedInUser = localStorage.getItem("loggedInUser");
  return loggedInUser ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;