import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export const RequireAuth = ({ children, allowedRoles }) => {
  const { user } = useContext(AuthContext);

  console.log("User Role:", user.role);
  console.log("Allowed Roles:", allowedRoles);

  if (!user || !user.token) {
    return <Navigate to={`/login`} />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role?.toLowerCase())) {
    return <Navigate to="/unauthorized" state={{ fromAuth: true }} />;
  }

  return children;
};
