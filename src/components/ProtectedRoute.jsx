// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { useTokenManager } from "@/hooks/useTokenManager";


const ProtectedRoute = ({ children }) => {
  const { user } = useUser();

  if (!user) {
    // If not logged in, send to login page
    return <Navigate to="/login" replace />;
  }

  // If logged in, show the page
  return children;
};

export default ProtectedRoute;
