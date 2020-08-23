import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark shadow fixed-top navBar">
        <div className="container" style={{ backgroundColor: "inherit" }}>
          <Link className="navbar-brand" to="index">
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
                <Link className="nav-link pl-2" to="/about" id="active">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link pl-2" to="/faq">
                  FAQ
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link pl-2" to="/contact">
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link pl-2" to="/dashboard">
                  Dashboard
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link pl-2" to="/signin">
                  Sign in
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link pl-2" to="/signup">
                  Sign up
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link pl-2" to="#">
                  Sign out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;