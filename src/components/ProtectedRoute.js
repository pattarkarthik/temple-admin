import React from "react";
import { Navigate } from "react-router-dom";

// A ProtectedRoute component to handle route guarding
const ProtectedRoute = ({ component: Component, isLoggedIn, ...rest }) => {
  return isLoggedIn ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
