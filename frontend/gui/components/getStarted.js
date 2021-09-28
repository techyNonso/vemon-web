import React, { Component } from "react";
import Header from "./header";
import Footer from "./footer";
import { Link } from "react-router-dom";
import { ExternalLink } from "react-external-link";

class GetStarted extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header location={this.props.location.pathname} />

        <section className="fdb-block">
          <div className="container">
            <div className="row justify-content-center pb-5">
              <div className="col-12 text-center">
                <h1>Let's Get Started.</h1>
              </div>
            </div>

            <div className="row text-left align-items-center pt-5 pb-md-5">
              <div className="col-4 col-md-5">
                <img alt="image" className="img-fluid" src="/img/up.png" />
              </div>

              <div className="col-12 col-md-5 m-md-auto">
                <h2>
                  <strong>1. Sign up/ Login</strong>
                </h2>
                <p className="lead">
                  To start off, you need to create an account with us. This is
                  the account you will use in monitoring your business
                  registered with us.If you already have an account,please login
                  and move on to the next step .
                </p>
                <p>
                  <ExternalLink
                    href="http://localhost:8081/signup"
                    className="btn btn-outline-success"
                  >
                    Sign Up
                  </ExternalLink>
                </p>
              </div>
            </div>

            <div className="row text-left align-items-center pt-5 pb-md-5">
              <div className="col-4 col-md-5 m-md-auto order-md-5">
                <img alt="image" className="img-fluid" src="/img/form.png" />
              </div>

              <div className="col-12 col-md-5">
                <h2>
                  <strong>2. Download app.</strong>
                </h2>
                <p className="lead">
                  Once you have logged in, please proceed to download the
                  desktop app. You will be required to make a one time non
                  refundable payment in order to acquire rights to the app. This
                  right covers any number of installations and any number of
                  locations where the app is used.
                  <br />
                  <strong>Note:</strong> you need to be logged in.
                </p>
                <p>
                  <ExternalLink
                    href="http://localhost:8081/download"
                    className="btn btn-outline-success"
                  >
                    Download
                  </ExternalLink>
                </p>
              </div>
            </div>

            <div className="row text-left align-items-center pt-5">
              <div className="col-4 col-md-5">
                <img alt="image" className="img-fluid" src="/img/company.png" />
              </div>

              <div className="col-12 col-md-5 m-md-auto">
                <h2>
                  <strong>3. Create company.</strong>
                </h2>
                <p className="lead">
                  Proceed to dashboard and create a company, all branch/branches
                  where the desktop app is to be installed should be registered
                  under a parent company. We offer a 14 day initial access to
                  any of our premium plans.
                  <br />
                  <strong>Note: </strong>
                  This is a one time opportunity.
                </p>

                <p>
                  <ExternalLink
                    href="http://localhost:8081/dashboard/companies"
                    className="btn btn-outline-success"
                  >
                    Register company
                  </ExternalLink>
                </p>
              </div>
            </div>

            <div className="row text-left align-items-center pt-5 pb-md-5">
              <div className="col-4 col-md-5 m-md-auto order-md-5">
                <img alt="image" className="img-fluid" src="/img/reg.png" />
              </div>

              <div className="col-12 col-md-5">
                <h2>
                  <strong>4. Create branch.</strong>
                </h2>
                <p className="lead">
                  If you have created a company, please proceed to create a
                  branch under this company. The branch will be automaticaly
                  assigned an ID. which you will need to connect it to remote
                  server. locations where the app is used.
                  <br />
                  <strong>Note:</strong> you need to be logged in.
                </p>
                <p>
                  <ExternalLink
                    href="http://localhost:8081/dashboard/branches"
                    className="btn btn-outline-success"
                  >
                    Register branch
                  </ExternalLink>
                </p>
              </div>
            </div>

            <div className="row text-left align-items-center pt-5">
              <div className="col-4 col-md-5">
                <img alt="image" className="img-fluid" src="/img/app.png" />
              </div>

              <div className="col-12 col-md-5 m-md-auto">
                <h2>
                  <strong>5. Install app.</strong>
                </h2>
                <p className="lead">
                  Now, install and set up your app using the{" "}
                  <strong>Company Id ,and Branch Id</strong> that were created
                  for you initially. If you have any questions, please reach out
                  to us through mail on chat and we will respond as soon as
                  possible.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }
}

export default GetStarted;
