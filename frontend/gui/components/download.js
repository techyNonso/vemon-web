import React, { Component, Fragment, useState } from "react";
import Header from "./header";
import Footer from "./footer";
import { saveUser } from "Store/actions/accountAction";
import { connect } from "react-redux";
import propTypes from "prop-types";
import axiosInstance from "../modules/axiosInstance";
import {
  usePaystackPayment,
  PaystackButton,
  PaystackConsumer,
} from "react-paystack";

//import bootstrap component
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";

class Download extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayModal: false,
      download_access: false,
    };
  }

  downloadApp() {
    fetch("../assets/pdf/resume.pdf", {
      method: "GET",
      headers: {
        "Content-Type": "application/pdf",
      },
    })
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "resume.pdf");

        document.body.appendChild(link);

        link.click();

        link.parentNode.removeChild(link);
      });
  }

  proceedPayment() {
    //update user download access
    this.setState({
      displayModal: false,
    });

    //declare data
    let data = {
      download_access: true,
    };

    console.log(data);

    axiosInstance
      .put(`http://127.0.0.1:8000/user-update/`, data)
      .then(
        (res) => {
          let values = {
            email: this.props.user.email,
            expirationLimit: this.props.user.expirationLimit,
            first_name: this.props.user.first_name,
            last_name: this.props.user.last_name,
            stockLimit: this.props.user.stockLimit,
            user_id: this.props.user.user_id,
            download_access: true,
          };

          saveUser(values);

          //proceed download
          this.downloadApp();
        }
        //this.props.getCompanyBranches(this.props.company.companyId)
      )
      .catch((err) => console.log(err));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.user !== this.props.user) {
      this.setState({
        download_access: this.props.user.download_access,
      });
    }
  }

  componentDidMount() {
    this.setState({
      download_access: this.props.user.download_access,
    });
  }
  render() {
    //work with modal
    let modal = null;
    if (this.state.displayModal) {
      modal = <ActMod proceedPayment={this.proceedPayment.bind(this)} />;
    }
    return (
      <Fragment>
        <Header location={this.props.location.pathname} />
        {modal}
        <section className="fdb-block">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-12 col-md-12 col-lg-6 col-xl-5">
                <h1>Download Us</h1>
                <p className="lead mb-5">
                  You are few steps away from getting Vemon desktop app. The
                  button you see below is dependent on your download access
                  placed on the app. You are required to make a one time payment
                  and forever have access to Vemon desktop app.
                </p>
              </div>
              <div className="col-12 col-md-8 m-auto ml-lg-auto mr-lg-0 col-lg-6 pt-5 pt-lg-0">
                <img alt="image" className="img-fluid" src="../img/ussvg.png" />
              </div>

              <div className="col-auto mt-4 mt-sm-0">
                {this.state.download_access && (
                  <button
                    onClick={this.downloadApp}
                    className="btn btn-success myBtn"
                  >
                    Download
                  </button>
                )}
                {!this.state.download_access && (
                  <button
                    className="btn btn-success myBtn"
                    onClick={(e) =>
                      this.setState({
                        displayModal: true,
                      })
                    }
                  >
                    Pay Now
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </Fragment>
    );
  }
}

Download.propTypes = {
  saveUser: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.account.item,
  company: state.companies.item,
});

export default connect(mapStateToProps, { saveUser })(Download);

//write modal for this app
const ActMod = (props) => {
  const [isOpen, setIsOpen] = useState(true);
  const amount = 5000000;
  const [email, setEmail] = useState("");
  const [firstname, setFname] = useState("");
  const [lastname, setLname] = useState("");
  const [phone, setPhone] = useState("");

  const updateUser = () => {
    setIsOpen(false);
    props.proceedPayment();
  };

  const publicKey = "pk_test_f8fb957ddc9b7a92212008bccc1a4dfe63ce3e3f";
  //pay stack settings
  const componentProps = {
    reference: new Date().getTime(),
    email,
    amount,
    firstname: firstname.charAt(0).toUpperCase() + firstname.slice(1),
    lastname: lastname.charAt(0).toUpperCase() + lastname.slice(1),
    channels: ["card" /*, "bank_transfer"*/],
    metadata: {
      firstname,
      lastname,
      phone,
    },
    currency: "NGN",
    publicKey,
    text: "Pay Now",
    onSuccess: () => updateUser(),
    onClose: () => console.log("Wait! You need this oil, don't go!!!!"),
  };
  const showModal = () => {
    setIsOpen(false);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  const changeSelect = (event) => {
    setPlan(event.target.value);
  };

  const changeName = (event) => {
    setName(event.target.value);
  };

  let displayBody;
  let btn;
  displayBody = displayBody = (
    <form className="form">
      <div className="form-group">
        <input
          placeholder="amount"
          className="form-control"
          value="50,000"
          readOnly
        />
      </div>

      <div className="form-group">
        <input
          placeholder="Firstname"
          className="form-control"
          onChange={(e) => setFname(e.target.value)}
        />
      </div>

      <div className="form-group">
        <input
          placeholder="Lastname"
          className="form-control"
          onChange={(e) => setLname(e.target.value)}
        />
      </div>

      <div className="form-group">
        <input
          placeholder="email"
          className="form-control"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-group">
        <input
          placeholder="Phone number"
          className="form-control"
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
    </form>
  );

  btn = <PaystackButton className="paystack-button" {...componentProps} />;

  return (
    <Modal show={isOpen} onHide={hideModal}>
      <ModalHeader>
        <ModalTitle>Payment</ModalTitle>
      </ModalHeader>

      <ModalBody>{displayBody}</ModalBody>
      <ModalFooter>
        <button className="btn btn-sm btn-secondary" onClick={hideModal}>
          Cancel
        </button>

        {btn}
      </ModalFooter>
    </Modal>
  );
};
