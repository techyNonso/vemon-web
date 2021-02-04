import React, { Component, Fragment } from "react";
import DateRangeSelect from "Components/dashComponents/dateRangeSelect";
import propTypes from "prop-types";
import { connect } from "react-redux";
import swal from "sweetalert";

class Alerts extends Component {
  constructor(props) {
    super(props);
  }

  //wait for when our props arrive
  componentDidUpdate(prevProps, prevState) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      //settings form alerts//////////////////
      if (error.first_name) {
        swal({
          title: "Error",
          text: `Firstname: ${error.first_name.join(", ")}`,
          icon: "error",
          button: "OK",
        });
      } else if (error.last_name) {
        swal({
          title: "Error",
          text: `Lastname: ${error.last_name.join(", ")}`,
          icon: "error",
          button: "OK",
        });
      } else if (error.expiration_limit) {
        swal({
          title: "Error",
          text: `Expiration Limit: A valid number is needed`,
          icon: "error",
          button: "OK",
        });
      } else if (error.stock_limit) {
        swal({
          title: "Error",
          text: `Stock Limit: A valid number is needed`,
          icon: "error",
          button: "OK",
        });
      } else if (error.companyName) {
        swal({
          title: "Error",
          text: `Company Name: ${error.companyName.join(", ")}`,
          icon: "error",
          button: "OK",
        });
      } else if (error.plan) {
        swal({
          title: "Error",
          text: `Plan: ${error.plan.join(", ")}`,
          icon: "error",
          button: "OK",
        });
      }

      //hide loader

      if (this.props.hideLoading) this.props.hideLoading();
    }
  }

  render() {
    return <Fragment />;
  }
}

Alerts.propTypes = {
  error: propTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  error: state.error.item,
});

export default connect(mapStateToProps, null)(Alerts);
