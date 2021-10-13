import React, { Component } from "react";
import Header from "./header";
import Footer from "./footer";
import { ExternalLink } from "react-external-link";

class About extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header location={this.props.location.pathname} />

        <section className="fdb-block">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-12 col-md-12 col-lg-6 col-xl-5">
                <h1>About Us</h1>
                <p className="lead mb-5">
                  Managerfront is an African based company focused on creating
                  digital products to help both small and big business grow. It
                  was started by our founder who at the time of creating this
                  software was a college student and at same time worked as an
                  employee for some companies and in this time developed this
                  software to help solve the problems of the company.
                </p>
                <p>
                  <strong
                    style={{
                      fontFamily: "Franklin Gothic Medium",
                    }}
                  >
                    Ikeji Chukwunonso
                  </strong>
                </p>

                <p className="h1">
                  <ExternalLink
                    href="https://web.facebook.com/profile.php?id=100009564907771"
                    style={{
                      color: "	#4267B2",
                      display: "inline-block",
                      padding: "10px",
                    }}
                  >
                    {" "}
                    <i className="fa fa-facebook-square" aria-hidden="true"></i>
                  </ExternalLink>
                  <ExternalLink
                    href="#"
                    style={{
                      color: "	#1DA1F2",
                      display: "inline-block",
                      padding: "10px",
                    }}
                  >
                    <i className="fa fa-twitter" aria-hidden="true"></i>
                  </ExternalLink>
                  <ExternalLink
                    href="https://www.github.com/techynonso"
                    target="_blank"
                    style={{
                      display: "inline-block",
                      padding: "10px",
                      color: "black",
                    }}
                  >
                    <i className="fa fa-github-square" aria-hidden="true"></i>
                  </ExternalLink>
                  <ExternalLink
                    href="https://www.linkedin.com/in/chukwunonso-ikeji-040519205/"
                    target="_blank"
                    style={{
                      color: "	#0E76A8",
                      display: "inline-block",
                      padding: "10px",
                    }}
                  >
                    <i className="fa fa-linkedin-square" aria-hidden="true"></i>
                  </ExternalLink>
                </p>
              </div>
              <div className="col-12 col-md-8 m-auto ml-lg-auto mr-lg-0 col-lg-6 pt-5 pt-lg-0">
                <img alt="image" className="img-fluid" src="../img/ussvg.png" />
              </div>
            </div>
          </div>
        </section>

        <section className="fdb-block block-top-adjust">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-12 col-md-8 col-lg-6 m-md-auto ml-lg-0 mr-lg-auto">
                <img
                  alt="image"
                  className="img-fluid"
                  src="../src/froala/imgs/draws/features.svg"
                />
              </div>
              <div className="col-12 col-lg-6 col-xl-5 ml-sm-auto pt-5 pt-lg-0">
                <h1>More On Us</h1>

                <div className="row pt-4 pt-xl-5">
                  <div className="col-12 col-sm-6 col-xl-5">
                    <h4>
                      <strong>Passion</strong>
                    </h4>
                    <p>
                      We are driven by being able to create solutions that would
                      help business perform better.
                    </p>
                  </div>
                  <div className="col-12 col-sm-6 col-xl-5 m-auto pt-3 pt-sm-0">
                    <h4>
                      <strong>Values</strong>
                    </h4>
                    <p>
                      Our Team is made up of people of high moral values and we
                      value our clien clients above everyother thing.
                    </p>
                  </div>
                </div>

                <div className="row pt-3">
                  <div className="col-12 col-sm-6 col-xl-5">
                    <h4>
                      <strong>Quality</strong>
                    </h4>
                    <p>
                      With our higly trained professionals and project advisers,
                      we are bound to give you a standard like no other.
                    </p>
                  </div>
                  <div className="col-12 col-sm-6 col-xl-5 m-auto pt-3 pt-sm-0">
                    <h4>
                      <strong>Accuracy</strong>
                    </h4>
                    <p>
                      Data is a vital aspect of any form of business, we thus
                      properly analyse all your data in toher to provide the
                      best of service to you.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="fdb-block block-top-adjust">
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="col-auto">
                <h2>Want to get the best out of your business?</h2>
              </div>
              <div className="col-auto mt-4 mt-sm-0">
                <a className="btn myBtn" href="https://www.froala.com">
                  Download
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="fdb-block team-2 block-top-adjust">
          <div className="container">
            <div className="row text-center justify-content-center">
              <div className="col-8">
                <h1>Meet Our Team</h1>
              </div>
            </div>

            <div className="row-50"></div>

            <div className="row text-center justify-content-center">
              <div className="col-sm-3 m-sm-auto">
                {/**<img
                  alt="image"
                  className="img-fluid rounded-circle"
                  src="../src/froala/imgs/people/4.jpg"
                />

                <h4>Sara Doe</h4>
                <p>Technical Adviser</p>*/}
              </div>

              <div className="col-sm-3 m-sm-auto">
                <img
                  alt="image"
                  className="img-fluid rounded-circle"
                  src="../src/froala/imgs/people/5.jpg"
                />

                <h4>Ikeji Chukwunonso</h4>
                <p>Founder ( Developer )</p>
              </div>

              <div className="col-sm-3 m-sm-auto">
                {/**<img
                  alt="image"
                  className="img-fluid rounded-circle"
                  src="../src/froala/imgs/people/7.jpg"
                />

                <h4>Sara Doe</h4>

                <p>Technical Adviser</p>*/}
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }
}

export default About;
