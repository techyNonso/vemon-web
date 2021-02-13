import React, { Link, Component } from "react";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import Header from "./header";
import Footer from "./footer";
import axiosInstance from "Modules/axiosInstance";
import { saveUser } from "Store/actions/accountAction";
import validate from "Components/formHandler/validateInfo";
import useForm from "Components/formHandler/useForm";

function PasswordReset(props) {
  let formValue;
  formValue = (
    <div>
      <div className="form-group">
        <label>
          <i className="zmdi zmdi-account material-icons-name"></i>
        </label>
        <input
          type="password"
          name="password2"
          id="email"
          placeholder="enter password eg. Smith=10?"
        />
      </div>

      <div className="form-group">
        <label>
          <i className="zmdi zmdi-lock"></i>
        </label>
        <input
          type="password"
          name="password2"
          id="your_pass"
          placeholder="Confirm password"
        />
      </div>

      <div className="form-group form-button">
        <input
          type="submit"
          name="PasswordReset"
          id="PasswordReset"
          className="myBtn"
          value="Log in"
        />
        <br />
      </div>
    </div>
  );
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

export default PasswordReset;
