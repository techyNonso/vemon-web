import React, { Component } from "react";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import Header from "./header";
import Footer from "./footer";
import axiosInstance from "Modules/axiosInstance";
import axios from "axios";
import { saveUser } from "Store/actions/accountAction";
import validate from "Components/formHandler/validateInfo";
import useForm from "Components/formHandler/useForm";
import { Link, useLocaiton, useParams } from "react-router-dom";
import queryString from "query-string";
import swal from "sweetalert";

function EmailVerification(props) {
  const [verified, setValidity] = useState(false);
  const [verificationInfo, setInfo] = useState("");
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const verify = (values) => {
    values.verified === "true" ? setValidity(true) : setValidity(false);
    setInfo(values.info);
  };

  useEffect(() => {
    //run only before initial form submit
    if (!submitted) {
      const values = queryString.parse(props.location.search);
      verify(values);
    }
    //check if form was submitted and no errors recorded
    if (
      submitted &&
      Object.keys(errors).length === 0 &&
      errors.constructor === Object
    ) {
      axios
        .post("http://127.0.0.1:8000/resend-validation-email/", {
          email: email,
        })
        .then((res) => {
          swal({
            title: res.data.response,
            //text :" Name change successful",
            icon: "success",
            button: "OK",
          });
          setEmail("");
        })
        .catch((err) => {
          swal({
            title: err.response.data.message,
            //text :" Name change successful",
            icon: "error",
            button: "OK",
          });
        });
      setSubmitted(false);
    }
  }, [errors]);
  const history = useHistory();

  //handle submit
  const submitRequest = (e) => {
    e.preventDefault();
    //set info notification empty
    setInfo("");
    //set submitted true
    setSubmitted(true);
    //validate input
    setErrors(
      validate(
        {
          email: email,
        },
        "emailValidation"
      )
    );
  };
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
          <input
            type="text"
            name="email"
            id="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {errors.email && <div className="formError">{errors.email}</div>}

        <br />

        <div className="form-group form-button">
          <input
            type="submit"
            name="EmailVerification"
            id="EmailVerification"
            className="myBtn"
            value="Resend"
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
                <form
                  method="POST"
                  className="register-form"
                  id="login-form"
                  onSubmit={submitRequest}
                >
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
