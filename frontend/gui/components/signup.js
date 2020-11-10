import React, { Link, Component } from "react";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import Header from "./header";
import Footer from "./footer";
import axiosInstance from "Modules/axiosInstance";

function Signup() {
  const history = useHistory();
  //handle states
  const [firstName, setFname] = useState("");
  const [lastName, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setFPassword] = useState("");
  const [password2, setSPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    //submit to api

    axiosInstance
      .post("register/", {
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
        password: password,
        password2: password2,
      })
      .then((res) => {
        history.push("/signin");

        console.log(res.data);
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div>
      <Header />
      <div className="main">
        <section className="signup">
          <div className="container formContainer">
            <div className="signup-content">
              <div className="signup-form">
                <h2 className="form-title">Sign up</h2>

                <form
                  method="POST"
                  className="register-form"
                  id="register-form"
                >
                  <div className="form-group">
                    <label>
                      <i className="zmdi zmdi-account material-icons-name"></i>
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="fname"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFname(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <i className="zmdi zmdi-account material-icons-name"></i>
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="/name"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLname(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <i className="zmdi zmdi-email"></i>
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      <i className="zmdi zmdi-email"></i>
                    </label>
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      placeholder="Your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <i className="zmdi zmdi-lock"></i>
                    </label>
                    <input
                      type="password"
                      name="pass"
                      id="pass"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setFPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <i className="zmdi zmdi-lock-outline"></i>
                    </label>
                    <input
                      type="password"
                      name="re_pass"
                      id="re_pass"
                      placeholder="Repeat your password"
                      value={password2}
                      onChange={(e) => setSPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="checkbox"
                      name="agree-term"
                      id="agree-term"
                      className="agree-term"
                    />
                    <label className="label-agree-term">
                      <span>
                        <span></span>
                      </span>
                      I agree to
                      <a
                        href="#"
                        className="term-service"
                        style={{ textDecoration: " underline" }}
                      >
                        Terms of service
                      </a>
                    </label>
                  </div>
                  <div className="form-group form-button">
                    <input
                      type="submit"
                      name="signup"
                      id="signup"
                      className="myBtn"
                      value="Register"
                      onClick={handleSubmit}
                    />

                    <br />
                    <a
                      href="#"
                      className="signup-image-link"
                      style={{ textDecoration: "underline" }}
                    >
                      I am already member
                    </a>
                  </div>
                </form>
              </div>
              <div className="signup-image">
                <figure>
                  <img src="/img/sigup-img.jpg" alt="sing up image" />
                </figure>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default Signup;
