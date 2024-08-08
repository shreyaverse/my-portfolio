import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { userContext } from "../App";

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { user } = useContext(userContext);

  return user ? Component : <Navigate to="/login" />;
};

export default PrivateRoute;
