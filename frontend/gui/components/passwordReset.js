import React, { Link, Component } from "react";
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
import axios from "axios";
import swal from "sweetalert";
import queryString from "query-string";

function PasswordReset(props) {
  const history = useHistory();
  const [status, setStatus] = useState("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [token, setToken] = useState("");
  const [uidb64, setUid] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const verify = (values) => {
    if (values.verified === "true") {
      setStatus("input");
      setToken(values.token);
      setUid(values.uidb64);
    } else {
      swal({
        title: values.info,
        //text :" Name change successful",
        icon: "error",
        button: "OK",
      });
    }
  };

  useEffect(() => {
    //redirect if user is logged in
    if (localStorage.getItem("IsVemonOnline") == "true") {
      history.push("/");
    }
    //run only before initial form submit
    if (!submitted) {
      const values = queryString.parse(props.location.search);
      //if verified was sent
      if (values.verified) {
        verify(values);
      }
    }

    //if form was submitted
    if (
      submitted &&
      Object.keys(errors).length === 0 &&
      errors.constructor === Object
    ) {
      //if email we are to request link
      if (status == "email") {
        axios
          .post("http://127.0.0.1:8000/request-reset-email/", {
            email: email,
          })
          .then((res) => {
            swal({
              title: res.data.success,
              //text :" Name change successful",
              icon: "success",
              button: "OK",
            });
            setEmail("");
          })
          .catch((err) => {
            swal({
              title: err.response.data.error,
              //text :" Name change successful",
              icon: "error",
              button: "OK",
            });
          });
      } else {
        //if we are to submit new password
        axios
          .patch("http://127.0.0.1:8000/password-reset-complete/", {
            password: password,
            password2: password2,
            uidb64: uidb64,
            token: token,
          })
          .then((res) => {
            swal({
              title: res.data.message,
              //text :" Name change successful",
              icon: "success",
              button: "Ok",
            }).then((value) => {
              history.push("/signin");
            });
            setEmail("");
          })
          .catch((err) => {
            if (err.response.data.detail) {
              //if token error
              swal({
                title: err.response.data.detail,
                //text :" Name change successful",
                icon: "error",
                button: "Ok",
              }).then((value) => {
                //show email form
                setStatus("email");
              });
            } else {
              //if input error
              let data = err.response.data;
              setErrors({
                password: data.password ? data.password.toString() : "",
                password2: data.password2 ? data.password2.toString() : "",
              });
            }
          });
      }
      //submitted false
      setSubmitted(false);
    }
  }, [errors]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (status == "email") {
      setSubmitted(true);
      //check errors for email form
      setErrors(
        validate(
          {
            email: email,
          },
          "emailValidation"
        )
      );
    } else {
      setSubmitted(true);
      //check errors for password forms
      setErrors(
        validate(
          {
            password,
            password2,
          },
          "passwordValidation"
        )
      );
    }
  };

  let formValue;
  if (status == "input") {
    formValue = (
      <div>
        <div className="form-group">
          <label>
            <i className="zmdi zmdi-account material-icons-name"></i>
          </label>
          <input
            type="password"
            name="password"
            id="email"
            placeholder="enter password eg. Smith=10?"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errors.password && <div className="formError">{errors.password}</div>}

        <div className="form-group">
          <label>
            <i className="zmdi zmdi-lock"></i>
          </label>
          <input
            type="password"
            name="password2"
            id="your_pass"
            placeholder="Confirm password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>
        {errors.password2 && (
          <div className="formError">{errors.password2}</div>
        )}
        <br />

        <div className="form-group form-button">
          <input
            type="submit"
            name="PasswordReset"
            id="PasswordReset"
            className="myBtn"
          />
          <br />
        </div>
      </div>
    );
  } else if (status == "email") {
    formValue = (
      <div>
        <div className="form-group">
          <label>
            <i className="zmdi zmdi-account material-icons-name"></i>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {errors.email && <div className="formError">{errors.email}</div>}

        <br />
        <div className="form-group form-button">
          <input
            type="submit"
            name="PasswordReset"
            id="PasswordReset"
            className="myBtn"
            value="Send me reset link"
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
                <h2 className="form-title">Password Reset</h2>
                <form
                  method="POST"
                  className="register-form"
                  id="login-form"
                  onSubmit={handleSubmit}
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

export default PasswordReset;
