import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import propTypes from "prop-types";
import Auth from "Components/auth";
import { useHistory } from "react-router-dom";
import axios from "axios";
import logout from "../modules/logout";
function Header(props) {
  const history = useHistory();
  const [online, setOnline] = useState("none");
  const [offline, setOffline] = useState("block");
  //assign active to appropriate page
  let about,
    contact,
    faq,
    dashboard,
    signin,
    signup = "";
  switch (props.location.split("/")[1]) {
    case "about":
      about = "active";
      break;
    case "contact":
      contact = "active";
      break;
    case "faq":
      faq = "active";
      break;
    case "dashboard":
      dashboard = "active";
      break;
    case "signin":
      signin = "active";
      break;
    case "signup":
      signup = "active";
      break;

    default:
      break;
  }

  //user checker
  const isEmpty = (obj) => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }

    return true;
  };

  //logout
  const myLogout = () => {
    logout();
  };

  useEffect(() => {
    //check if logged in
    if (Auth.isAuthenticated()) {
      setOnline("block");
      setOffline("none");
    } else {
      setOnline("none");
      setOffline("block");
    }
  }, []);
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark shadow fixed-top navBar">
        <div className="container" style={{ backgroundColor: "inherit" }}>
          <Link className="navbar-brand" to="/">
            <img src="/img/icon.png" alt="" width="70px" />
            <span id="myLogo">Vemon</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link pl-2" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link pl-2" to="/about" id={about}>
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link pl-2" to="/faq" id={faq}>
                  FAQ
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link pl-2" to="/contact" id={contact}>
                  Contact
                </Link>
              </li>
              <li className="nav-item" style={{ display: online }}>
                <Link className="nav-link pl-2" to="/dashboard" id={dashboard}>
                  Dashboard
                </Link>
              </li>

              <li className="nav-item" style={{ display: offline }}>
                <Link className="nav-link pl-2" to="/signin" id={signin}>
                  Login
                </Link>
              </li>
              <li className="nav-item" style={{ display: offline }}>
                <Link className="nav-link pl-2" to="/signup" id={signup}>
                  Sign up
                </Link>
              </li>
              <li
                className="nav-item"
                style={{ display: online }}
                onClick={myLogout}
              >
                <Link className="nav-link pl-2" to="#">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.account.item,
});

export default connect(mapStateToProps, null)(Header);
