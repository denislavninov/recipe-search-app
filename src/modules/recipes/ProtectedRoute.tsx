import { Navigate } from "react-router-dom";
import React from "react";
import { useUser } from "../user/UserContext";
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser() as { user: any };
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
