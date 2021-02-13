import React, { Component } from "react";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import Header from "./header";
import Footer from "./footer";
import axiosInstance from "Modules/axiosInstance";
import { saveUser } from "Store/actions/accountAction";
import validate from "Components/formHandler/validateInfo";
import useForm from "Components/formHandler/useForm";
import { Link, useLocaiton, useParams } from "react-router-dom";
import queryString from "query-string";

function EmailVerification(props) {
  const verify = (values) => {
    values.verified === "true" ? setValidity(true) : setValidity(false);
    setInfo(values.info);
  };
  useEffect(() => {
    const values = queryString.parse(props.location.search);
    verify(values);
  }, []);
  const history = useHistory();

  const initialFormData = Object.freeze({
    email: "",
    password: "",
  });

  const { handleChange, values, errors, handleSubmit } = useForm(
    validate,
    history,
    "EmailVerification",
    saveUser
  );

  const [verified, setValidity] = useState(false);
  const [verificationInfo, setInfo] = useState("");

  let formValue;
  //check if verified or not

  if (verified) {
    formValue = (
      <div>
        <div className="text-center">
          <span
            style={{ color: "green", textAlign: "center", display: "block" }}
          >
            {verificationInfo}
          </span>

          <Link to="/signin" className="btn btn-success">
            Proceed to login
          </Link>
        </div>
      </div>
    );
  } else {
    formValue = (
      <div>
        <div className="form-group">
          <span
            style={{ color: "red", textAlign: "center", display: "center" }}
          >
            {verificationInfo}
          </span>

          <label>
            <i className="zmdi zmdi-account material-icons-name"></i>
          </label>
          <input type="text" name="email" id="email" placeholder="email" />
        </div>

        <br />

        <div className="form-group form-button">
          <input
            type="submit"
            name="EmailVerification"
            id="EmailVerification"
            className="myBtn"
            value="Resend"
            onClick={handleSubmit}
          />
          <br />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header location={props.location.pathname} />
      <div className="main">
        <section className="sign-in">
          <div className="container formContainer">
            <div className="signin-content">
              <div className="signin-image">
                <figure>
                  <img src="/img/login-img.jpg" alt="sing up image" />
                </figure>
              </div>

              <div className="signin-form">
                <h2 className="form-title text-center">Email Verification</h2>
                <form method="POST" className="register-form" id="login-form">
                  {formValue}
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default EmailVerification;
