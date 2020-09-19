import React from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../context/user";

export default function PrivateRoute({ children, path }) {
  const { user } = React.useContext(UserContext);
  return (
    <Route to={path}>{user.token ? children : <Redirect to="/login" />}</Route>
  );
}
