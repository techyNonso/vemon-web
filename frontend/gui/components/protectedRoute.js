import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Auth from "Components/auth";
import propTypes from "prop-types";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  let path = window.location.pathname;
  return (
    <Route
      {...rest}
      render={(props) => {
        if (Auth.isAuthenticated() && Auth.isNotCredentialPage(path)) {
          return <Component {...props} />;
        } else if (!Auth.isAuthenticated() && Auth.isCredentialPage(path)) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  user: state.account.item,
});

export default connect(mapStateToProps, null)(ProtectedRoute);
