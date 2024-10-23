import { Navigate } from "react-router-dom";
import React from "react";
import { useUser } from "../user/UserContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useUser();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
