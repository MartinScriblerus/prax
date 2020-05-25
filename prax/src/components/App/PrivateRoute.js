
import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../context/auth";
var isAuthenticated = require("../../isAuthenticated");

function PrivateRoute({ component: Component, ...rest }) {
  isAuthenticated = useAuth();

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect 
              to={{ pathname: "/login"  }}
            />
        )
      }
    />
  );
}

export default PrivateRoute;