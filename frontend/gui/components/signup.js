import React, {Link, Component}from 'react';

import Header from './header';
import Footer from './footer';

class Signup extends Component {
  render() {


    return (
      <div>
        <Header />
        <div className="main">
     
      <section className="signup">
        <div className="container formContainer">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title">Sign up</h2>
              <form method="POST" className="register-form" id="register-form">
                <div className="form-group">
                  <label 
                    ><i className="zmdi zmdi-account material-icons-name"></i
                  ></label>
                  <input
                    type="text"
                    name="name"
                    id="fname"
                    placeholder="First Name"
                  />
                </div>
                <div className="form-group">
                  <label 
                    ><i className="zmdi zmdi-account material-icons-name"></i
                  ></label>
                  <input
                    type="text"
                    name="name"
                    id="/name"
                    placeholder="Last Name"
                  />
                </div>
                <div className="form-group">
                  <label ><i className="zmdi zmdi-email"></i></label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Your Email"
                  />
                </div>
                <div className="form-group">
                  <label ><i className="zmdi zmdi-lock"></i></label>
                  <input
                    type="password"
                    name="pass"
                    id="pass"
                    placeholder="Password"
                  />
                </div>
                <div className="form-group">
                  <label 
                    ><i className="zmdi zmdi-lock-outline"></i
                  ></label>
                  <input
                    type="password"
                    name="re_pass"
                    id="re_pass"
                    placeholder="Repeat your password"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="checkbox"
                    name="agree-term"
                    id="agree-term"
                    className="agree-term"
                  />
                  <label  className="label-agree-term"
                    ><span><span></span></span>I agree to
                    <a
                      href="#"
                      className="term-service"
                      style={{textDecoration:" underline"}}
                      >Terms of service</a
                    ></label
                  >
                </div>
                <div className="form-group form-button">
                  <input
                    type="submit"
                    name="signup"
                    id="signup"
                    className="myBtn"
                    value="Register"
                  />

                  <br />
                  <a
                    href="#"
                    className="signup-image-link"
                    style={{textDecoration: "underline"}}
                    >I am already member</a
                  >
                </div>
              </form>
            </div>
            <div className="signup-image">
              <figure>
                <img src="../img/sigup-img.jpg" alt="sing up image" />
              </figure>
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

export default Signup