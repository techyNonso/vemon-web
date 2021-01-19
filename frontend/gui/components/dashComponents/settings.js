import React, { Component, useState, useEffect } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { updateDetails, updateLimits } from "Store/actions/accountAction";
import Alerts from "Components/alerts";
import axiosInstance from "Modules/axiosInstance";
//loading imports
import { css } from "@emotion/core";
import { BeatLoader } from "react-spinners";

const Settings = (props) => {
  const [email, setEmail] = useState("");
  const [first_name, setFname] = useState("");
  const [last_name, setLname] = useState("");
  const [user_id, setUserId] = useState("");
  const [expirationLimit, setExp] = useState("");
  const [stockLimit, setStockLimit] = useState("");
  const [popAlert, setAlert] = useState("none");
  const [loading, setLoading] = useState("none");

  useEffect(() => {
    setEmail(props.user.email);
    setFname(props.user.first_name);
    setLname(props.user.last_name);
    setUserId(props.user.user_id);
    setExp(props.user.expirationLimit);
    setStockLimit(props.user.stockLimit);
    hideLoading();
  }, [
    props.user.first_name,
    props.user.last_name,
    props.user.expirationLimit,
    props.user.stockLimit,
  ]);

  const changeStockLimit = (event) => {
    setStockLimit(event.target.value);
  };

  const changeExpiration = (event) => {
    setExp(event.target.value);
  };

  const changeFname = (event) => {
    setFname(event.target.value);
  };

  const changeLname = (event) => {
    setLname(event.target.value);
  };

  const showLoading = () => {
    setLoading("block");
  };

  const hideLoading = () => {
    setLoading("none");
  };

  const workOnLimits = () => {
    let values = {
      email: email,
      expirationLimit: expirationLimit,
      first_name: first_name,
      last_name: last_name,
      stockLimit: stockLimit,
      user_id: user_id,
    };

    showLoading();
    props.updateLimits(values);
  };

  const workOnDetails = () => {
    let values = {
      email: email,
      expirationLimit: expirationLimit,
      first_name: first_name,
      last_name: last_name,
      stockLimit: stockLimit,
      user_id: user_id,
    };
    showLoading();
    props.updateDetails(values);
  };

  const loaderStyle = {
    width: "200px",
    position: "fixed",
    zIndex: "1000",
    left: "50%",
    marginLeft: "-100px",
    display: loading,
  };

  return (
    <div>
      <Alerts hideLoading={hideLoading} />
      <div className="row pr-4 mb-3">
        <div className="text-center  " style={loaderStyle}>
          <BeatLoader size={15} color="green" loading />
        </div>
      </div>
      <div className="row  mb-4">
        <div className="col-lg-6  pr-4 pl-4 mb-4">
          <div className="boardBearer p-3">
            <div className="border border-top-0 border-right-0 border-left-0">
              <h5>Stock settings</h5>
            </div>

            <form action="" className="form mt-3">
              <div className="form-field mb-3">
                <input
                  type="number"
                  id="stockPerc"
                  min="1"
                  className="form-control"
                  placeholder="stock limit"
                  value={stockLimit}
                  onChange={changeStockLimit}
                />
                <span className="settingSpan">
                  This is maximum percentage stock volume required to triger
                  stock exhaustion alert
                </span>
              </div>

              <div className="form-field">
                <input
                  type="number"
                  id="stockExp"
                  min="1"
                  value={expirationLimit}
                  className="form-control"
                  placeholder="expiration limit"
                  onChange={changeExpiration}
                />
                <span className="settingSpan">
                  This is maximum number of days required to trigger stock
                  expiration alert
                </span>
              </div>

              <div className="border border-right-0 border-left-0 border-bottom-0 mt-3 text-right">
                <a
                  href="#"
                  className="btn btn-sm btn-primary mt-2"
                  onClick={workOnLimits}
                >
                  Save
                </a>
              </div>
            </form>
          </div>
        </div>

        <div className="col-lg-6  pr-4 pl-4 mb-4">
          <div className="boardBearer p-3">
            <div className="border border-top-0 border-right-0 border-left-0">
              <h5>User settings</h5>
            </div>

            <form action="" className="form mt-3">
              <div className="form-field mb-3">
                <input
                  type="text"
                  id="fname"
                  className="form-control"
                  placeholder="Firstname"
                  value={first_name}
                  onChange={changeFname}
                />
              </div>

              <div className="form-field mb-3">
                <input
                  type="text"
                  id="lname"
                  className="form-control"
                  placeholder="Lastname"
                  value={last_name}
                  onChange={changeLname}
                />
              </div>

              <br />
              <br />
              <br />

              {/***<div className="form-field mb-3">
                <input
                  type="text"
                  id="email"
                  className="form-control"
                  placeholder="Email"
                />
  </div> **/}

              <div className="border border-right-0 border-left-0 border-bottom-0 mt-3 text-right">
                <a
                  href="#"
                  className="btn btn-sm btn-primary mt-2"
                  className="btn btn-sm btn-primary mt-2"
                  onClick={workOnDetails}
                >
                  Save
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

Settings.propTypes = {
  user: propTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.account.item,
});

export default connect(mapStateToProps, { updateLimits, updateDetails })(
  Settings
);
