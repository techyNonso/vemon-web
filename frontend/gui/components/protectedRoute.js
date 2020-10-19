import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import propTypes from "prop-types";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  //user checker
  const isEmpty = (obj) => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }

    return true;
  };

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isEmpty(props.user)) {
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
