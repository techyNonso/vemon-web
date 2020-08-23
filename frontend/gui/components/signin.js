import React, {Link, Component}from 'react';

import Header from './header';
import Footer from './footer';

class Signin extends Component {
  render() {


    return (
      <div>
        <Header />
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
              <h2 className="form-title">Sign in</h2>
              <form method="POST" className="register-form" id="login-form">
                <div className="form-group">
                  <label 
                    ><i className="zmdi zmdi-account material-icons-name"></i
                  ></label>
                  <input
                    type="text"
                    name="your_name"
                    id="email"
                    placeholder="email"
                  />
                </div>
                <div className="form-group">
                  <label ><i className="zmdi zmdi-lock"></i></label>
                  <input
                    type="password"
                    name="your_pass"
                    id="your_pass"
                    placeholder="Password"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="checkbox"
                    name="remember-me"
                    id="remember-me"
                    className="agree-term"
                  />
                  <label  className="label-agree-term"
                    ><span><span></span></span>Remember me</label
                  >
                </div>
                <div className="form-group form-button">
                  <input
                    type="submit"
                    name="signin"
                    id="signin"
                    className="myBtn"
                    value="Log in"
                  />
                  <br />
                  <a
                    href="#"
                    className="signup-image-link"
                    style={{textDecoration: "underline"}}
                    >Create an account</a
                  >
                </div>
              </form>
              <div className="social-login">
                <span className="social-label">Or login with</span>
                <ul className="socials">
                  <li>
                    <a href="#"
                      ><i className="display-flex-center zmdi zmdi-facebook"></i
                    ></a>
                  </li>
                  <li>
                    <a href="#"
                      ><i className="display-flex-center zmdi zmdi-twitter"></i
                    ></a>
                  </li>
                  <li>
                    <a href="#"
                      ><i className="display-flex-center zmdi zmdi-google"></i
                    ></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
        <Footer/>
      </div>
    )
  }
}

export default Signin