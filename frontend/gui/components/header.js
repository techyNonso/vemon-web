import React from 'react'

function Header() {
    return(
        <div>
             <nav
      className="navbar navbar-expand-lg bg-dark navbar-dark shadow fixed-top navBar"
    >
      <div className="container" style={{backgroundColor: "inherit"}}>
        <a className="navbar-brand" href="index.html">
          <img src="/img/icon.png" alt="" width="70px" /><span id="myLogo">
            Vemon</span
          >
        </a>
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
              <a className="nav-link pl-2" href="index.html">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link pl-2" href="about.html" id="active">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link pl-2" href="faq.html">FAQ</a>
            </li>
            <li className="nav-item">
              <a className="nav-link pl-2" href="contact.html">Contact</a>
            </li>
            <li className="nav-item">
              <a className="nav-link pl-2" href="dashboard.html">Dashboard</a>
            </li>

            <li className="nav-item">
              <a className="nav-link pl-2" href="sign-in.html">Sign in</a>
            </li>
            <li className="nav-item">
              <a className="nav-link pl-2" href="sign-up.html">Sign up</a>
            </li>
            <li className="nav-item">
              <a className="nav-link pl-2" href="#">Sign out</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
        </div>
    )
}

export default Header;