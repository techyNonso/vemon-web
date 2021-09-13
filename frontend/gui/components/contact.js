import React, { Component } from "react";
import Header from "./header";
import Footer from "./footer";
import axios from "axios";
import Alerts from "Components/alerts";
import swal from "sweetalert";

import validate from "Components/formHandler/validateInfo";

//import forms
import { Form } from "react-bootstrap";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      dept: "",
      msg: "",
      errors: {},
    };
  }

  changeFname(e) {
    this.setState({
      fname: e.target.value,
    });
  }

  changeLname(e) {
    this.setState({
      lname: e.target.value,
    });
  }

  changeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  changeDept(e) {
    this.setState({
      dept: e.target.value,
    });
  }

  changeMsg(e) {
    this.setState({
      msg: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    //set error state = the errors returned
    this.setState({
      errors: validate(
        {
          firstname: this.state.fname,
          lastname: this.state.lname,
          email: this.state.email,
          message: this.state.msg,
          department: this.state.dept,
        },
        "contact"
      ),
    });

    //check if errors is empty
    if (
      Object.keys(this.state.errors).length === 0 &&
      this.state.errors.constructor === Object
    ) {
      axios
        .post("http://127.0.0.1:8000/contact-us/", {
          email: this.state.email,
          fname: this.state.fname,
          lname: this.state.lname,
          msg: this.state.msg,
          dept: this.state.dept,
        })
        .then((res) => {
          this.setState({
            fname: "",
            lname: "",
            email: "",
            dept: "",
            msg: "",
          });
          swal({
            title: "Message",
            text: " Message sent successfully",
            icon: "success",
            button: "OK",
          });
        })
        .catch((err) => {
          swal({
            title: "Error",
            text: "OOPs! an error occurred, please try again later",
            icon: "error",
            button: "OK",
          });
        });
    }
  };

  render() {
    return (
      <div>
        <Header location={this.props.location.pathname} />

        <section
          className="fdb-block pt-0"
          style={{ backgroundImage: "url(/src/froala/imgs/shapes/8.svg)" }}
        >
          <div className="bg-gray">
            <div className="container">
              <div className="row-100"></div>
              <div className="row text-left">
                <div className="col-8">
                  <h1>Contact Us</h1>
                  <p className="lead">
                    We are always here to attend to your needs as soon as
                    possible. You can contact any division of the company
                    concerning a corresponding complaint or enquiry and we will
                    do well to reply you.
                  </p>
                </div>
              </div>
              <div className="row-100"></div>
            </div>
          </div>
          <div className="container bg-r">
            <div className="row-100"></div>
            <div className="row">
              <div className="col-12 col-md-6 col-lg-5">
                <h2>Call or email</h2>
                <p className="text-large">
                  Support, Sales, and Account Management services are currently
                  available in English
                </p>

                <p className="h3 mt-4 mt-lg-5">
                  <strong>Support</strong>
                </p>
                <p>+234 813 183 2011</p>
                <p>Support@vemon.com</p>

                <p>
                  Our technical support is available by phone or email from 8am
                  to 7pm GMT, Monday through Friday.
                </p>

                <p className="h3 mt-4 mt-lg-5">
                  <strong>Sales</strong>
                </p>
                <p>+234 813 183 2011</p>
                <p>Sales@vemon.com</p>

                <p>
                  Our technical support is available by phone or email from 11am
                  to 11pm BST, Monday through Friday.
                </p>
              </div>

              <div className="col-12 col-md-6 ml-auto">
                <h2>Drop us a message</h2>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                  <div className="row">
                    <div className="col">
                      <Form.Control
                        type="text"
                        name="firstname"
                        className="form-control"
                        placeholder="First name"
                        value={this.state.fname}
                        onChange={this.changeFname.bind(this)}
                      />
                      {this.state.errors.firstname && (
                        <div className="formError">
                          {this.state.errors.firstname}
                        </div>
                      )}
                    </div>

                    <div className="col">
                      <Form.Control
                        name="lastname"
                        type="text"
                        className="form-control"
                        placeholder="Last name"
                        value={this.state.lname}
                        onChange={this.changeLname.bind(this)}
                      />
                      {this.state.errors.lastname && (
                        <div className="formError">
                          {this.state.errors.lastname}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="row mt-4">
                    <div className="col">
                      <Form.Control
                        type="email"
                        name="email"
                        value={this.state.email}
                        className="form-control"
                        placeholder="Email"
                        onChange={this.changeEmail.bind(this)}
                      />
                      {this.state.errors.email && (
                        <div className="formError">
                          {this.state.errors.email}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="row mt-4">
                    <div className="col">
                      <select
                        className="form-control"
                        name="department"
                        value={this.state.dept}
                        required=""
                        onChange={this.changeDept.bind(this)}
                      >
                        <option value="">Select Department</option>
                        <option value="support@vemon.com">Support</option>
                        <option value="sales@vemon.com">Sales</option>
                        {/**<option value="account@vemon.com">Accounting</option>*/}
                      </select>
                      {this.state.errors.department && (
                        <div className="formError">
                          {this.state.errors.department}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col">
                      <textarea
                        className="form-control"
                        name="message"
                        rows="5"
                        placeholder="How can we help?"
                        value={this.state.msg}
                        onChange={this.changeMsg.bind(this)}
                      ></textarea>
                      {this.state.errors.message && (
                        <div className="formError">
                          {this.state.errors.message}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col">
                      <button type="submit" className="btn btn-success myBtn">
                        Submit
                      </button>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }
}

export default Contact;
