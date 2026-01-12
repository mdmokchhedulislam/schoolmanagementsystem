import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, admin, loading } = useSelector((state) => state.auth);

  if (loading) return <div>Loading...</div>; 


  if (!isAuthenticated) {
    return <Navigate to="/admin/login" />;
  }

  if (admin?.role !== "admin") {
    return <Navigate to="/" />; 
  }

  return children;
};

export default ProtectedRoute;