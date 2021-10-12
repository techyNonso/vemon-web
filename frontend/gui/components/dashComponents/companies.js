import React, { Component, Fragment, useState } from "react";
//import DateRangeSelect from "Components/dashComponents/dateRangeSelect";
import propTypes from "prop-types";
import { connect } from "react-redux";
import Pagination from "Components/dashComponents/pagination";
import {
  getCompanies,
  getCompany,
  createCompany,
} from "Store/actions/companyAction";
import { getPriceList, getPrice } from "Store/actions/pricingAction";

import axios from "axios";
import { getSearchResult, sortCompanies } from "Modules/company";
import { getCodeDetail, getAmount, updateCondition } from "Modules/pricing";

//import bootstrap component
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import axiosInstance from "../../modules/axiosInstance";
import {
  usePaystackPayment,
  PaystackButton,
  PaystackConsumer,
} from "react-paystack";

//loading imports
import { css } from "@emotion/core";
import { BeatLoader } from "react-spinners";

import swal from "sweetalert";

import Alerts from "Components/alerts";

class Companies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: "none",
      companies: [],
      originalCompanies: [],
      postsPerPage: 100,
      currentPage: 1,
      searchValue: "",
      displayModal: false,
      company: "",
      deleteClick: false,
      activateClick: false,
      editClick: false,
      addCompanyClick: false,
      display: "",
      standard: {},
      pro: {},
      maxi: {},
      advance: {},
      amount: 0,
    };

    this.handleProps = this.handleProps.bind(this);
    this.getLength = this.getLength.bind(this);
    this.hideLoading = this.hideLoading.bind(this);
  }

  handleProps(props) {
    //sort companies
    let sortedList = sortCompanies(props.companies);
    //sort plan code
    let { standard, pro, maxi, advance } = getCodeDetail(props.priceList);

    this.setState({
      companies: sortedList,
      originalCompanies: sortedList,
      standard,
      pro,
      maxi,
      advance,
      loading: "none",
    });
  }

  //add branch
  addBranch() {
    //check branch maximum
    if (
      this.props.company.plan.toUpperCase() == "PREMIUM ADVANCE" &&
      this.state.branches.length > 3
    ) {
      console.log("Maximum branch reached");
    } else {
      //get id
      let id = "BR" + Math.floor(1000 + Math.random() * 1000);

      //declare data
      let data = {
        branchId: id,
        companyId: this.props.company.companyId,
      };
      this.setState({
        loading: "block",
      });

      axiosInstance
        .post(`http://127.0.0.1:8000/branches/`, data)
        .then((res) =>
          this.props.getCompanyBranches(this.props.company.companyId)
        )
        .catch((err) => console.log(err));
    }
  }

  editCompany(event) {
    this.setState({
      editClick: true,
      display: "edit",
    });
    let id = event.target.dataset.id;
    this.props.getCompany(id);
  }

  activateCompany(event) {
    this.setState({
      activateClick: true,
      display: "activate",
    });
    let id = event.target.dataset.id;
    this.props.getCompany(id);
  }

  //delete branch
  deleteCompany(event) {
    this.setState({
      deleteClick: true,
      display: "delete",
    });
    let id = event.target.dataset.id;

    this.props.getCompany(id);
  }

  //add company
  addCompany(event) {
    this.setState({
      displayModal: true,
      display: "addcompany",
    });
  }

  //proceed to delete
  proceedDelete(id) {
    this.setState({
      loading: "block",
      deleteClick: false,
    });

    axiosInstance
      .delete(`http://127.0.0.1:8000/companies/${id}/`)
      .then((res) => {
        this.setState({
          displayModal: false,
          loading: "none",
        });

        swal({
          title: "Company Deleted Successfully",
          //text :" Name change successful",
          icon: "success",
          button: "OK",
        });

        this.props.getCompanies();
      })
      .catch((err) => console.log(err));
  }

  //proceed to update
  proceedUpdate({ id, plan, name }, newExp = false) {
    if (!plan.length == 0) {
      let branchLength = this.props.company.branches;

      //verify length of branches
      if (
        plan.toUpperCase() == "STANDARD" &&
        branchLength > this.state.standard.branches_allowed
      ) {
        this.setState({
          displayModal: false,
          loading: "none",
        });
        swal({
          title: "You have more branches than permitted for this plan",
          //text :" Name change successful",
          icon: "error",
          button: "OK",
        });
      } else if (
        plan.toUpperCase() == "PREMIUM PRO" &&
        branchLength > this.state.pro.branches_allowed
      ) {
        this.setState({
          displayModal: false,
          loading: "none",
        });
        swal({
          title: "You have more branches than permitted for this plan",
          //text :" Name change successful",
          icon: "error",
          button: "OK",
        });
      } else if (
        plan.toUpperCase() == "PREMIUM MAXI" &&
        branchLength > this.state.maxi.branches_allowed
      ) {
        this.setState({
          displayModal: false,
          loading: "none",
        });
        swal({
          title: "You have more branches than permitted for this plan",
          //text :" Name change successful",
          icon: "error",
          button: "OK",
        });
      } else {
        this.setState({
          loading: "block",
        });

        //check if new expiry date was specified
        let data;
        if (newExp) {
          //generate new expiry date
          let date = newExp;

          let year = date.getFullYear();
          let month =
            this.getLength(date.getMonth() + 1) == 1
              ? "0" + Number(date.getMonth() + 1)
              : date.getMonth() + 1;
          let day =
            this.getLength(date.getDate()) == 1
              ? "0" + date.getDate()
              : date.getDate();

          data = {
            companyName: name,
            plan: plan,
            expiryDate: `${year}-${month}-${day}`,
          };
        } else {
          data = {
            companyName: name,
            plan: plan,
          };
        }

        axiosInstance
          .put(`http://127.0.0.1:8000/companies/${id}/`, data)
          .then((res) => {
            this.setState({
              displayModal: false,
              loading: "none",
              editClick: false,
            });

            swal({
              title: "Company Updated Successfully",
              //text :" Name change successful",
              icon: "success",
              button: "OK",
            });

            this.props.getCompanies();
          })
          .catch((err) => console.log(err));
      }
    } else {
      this.setState({
        displayModal: false,
        loading: "none",
        editClick: false,
      });
      swal({
        title: "Please select a plan",
        //text :" Name change successful",
        icon: "error",
        button: "OK",
      });
    }
  }

  getLength(num) {
    return num.toString().length;
  }

  //proceed account activation
  proceedActivation(id) {
    this.setState({
      displayModal: false,
      activateClick: false,
    });

    //add 28 days to today
    let date = new Date(Date.now() + 24192e5);

    let year = date.getFullYear();
    let month =
      this.getLength(date.getMonth() + 1) == 1
        ? "0" + Number(date.getMonth() + 1)
        : date.getMonth() + 1;
    let day =
      this.getLength(date.getDate()) == 1
        ? "0" + date.getDate()
        : date.getDate();

    let data = {
      expiryDate: `${year}-${month}-${day}`,
    };

    //update data base
    axiosInstance
      .put(`http://127.0.0.1:8000/companies/payment/${id}/`, data)
      .then((res) => {
        // get companies
        this.props.getCompanies();
      })
      .catch((err) => console.log(err));
  }

  generateId() {
    return "company" + Math.random().toString(36).substr(2, 6);
  }

  //proceed to create
  proceedCreate({ name, plan }) {
    this.setState({
      displayModal: false,
      loading: "block",
    });

    //generate company Id
    let compId = this.generateId();
    //add 14 days ahead
    let date = new Date(Date.now() + 12096e5);

    let year = date.getFullYear();
    let month =
      this.getLength(date.getMonth() + 1) == 1
        ? "0" + Number(date.getMonth() + 1)
        : date.getMonth() + 1;
    let day =
      this.getLength(date.getDate()) == 1
        ? "0" + date.getDate()
        : date.getDate();

    let data = {
      companyName: name,
      companyId: compId,
      expiryDate: `${year}-${month}-${day}`,
      plan: plan,
    };

    //create company
    this.props.createCompany(data);
  }

  //change modal state to false
  hideDisplay() {
    this.setState({
      displayModal: false,
      deleteClick: false,
    });
  }

  //search starting from first page
  searchList(event) {
    this.setState({
      searchValue: event.target.value,
      currentPage: 1,
      loading: "block",
    });

    //check if there if value to be searched
    if (event.target.value.trim().length > 0) {
      //check if any result was received
      let list = getSearchResult(
        this.state.originalCompanies,
        event.target.value
      );

      if (list.length > 0) {
        this.setState({
          companies: list,
          loading: "none",
        });
      } else {
        //set list back to original list
        this.setState({
          companies: [],
          loading: "none",
        });
      }
    } else {
      //if search box is empty
      this.setState({
        companies: this.state.originalCompanies,
        loading: "none",
      });
    }
  }

  //wait for when our props arrive
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.companies !== this.props.companies) {
      //get pricing
      this.props.getPriceList();
    }

    if (prevProps.priceList !== this.props.priceList) {
      this.handleProps(this.props);
    }

    //check if activity changes and a click was done
    if (
      prevProps.company !== this.props.company &&
      (this.state.deleteClick ||
        this.state.editClick ||
        this.state.activateClick)
    ) {
      let amount = getAmount(
        this.props.company.plan,
        this.state.standard,
        this.state.pro,
        this.state.maxi,
        this.state.advance
      );
      this.setState({
        amount,
      });
      //check if company has branches
      if (Number(this.props.company.branches) > 0 && this.state.deleteClick) {
        swal({
          title: "Warning",
          text: " You need to delete all branches associated with this company",
          icon: "warning",
          button: "OK",
        });
        this.setState({
          deleteClick: false,
        });
      } else {
        this.setState({ displayModal: true, company: this.props.company });
      }
    }
  }

  checkStatus(date) {
    let oldDate = new Date(date);
    let now = new Date();
    now.setHours(0, 0, 0, 0);

    if (oldDate < now) {
      return true;
    } else {
      return false;
    }
  }

  componentDidMount() {
    //check companies
    this.props.getCompanies();
    this.setState({
      loading: "block",
    });
  }

  //hide loading
  hideLoading() {
    this.setState({
      loading: "none",
    });
  }

  render() {
    const loaderStyle = {
      width: "200px",
      position: "fixed",
      zIndex: "1000",
      left: "50%",
      marginLeft: "-100px",
      display: this.state.loading,
    };

    //get current stocks
    const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
    const currentPosts = this.state.companies.slice(
      indexOfFirstPost,
      indexOfLastPost
    );

    let companyList;
    //check list
    if (currentPosts.length > 0) {
      companyList = currentPosts.map((company) => (
        <tr key={company.id}>
          <td>{company.companyId}</td>
          <td>{company.companyName}</td>
          <td>{company.plan}</td>
          <td>{company.branches}</td>
          {this.checkStatus(company.expiryDate) && (
            <td>
              <button
                className="btn btn-primary btn-sm"
                data-id={company.id}
                onClick={this.activateCompany.bind(this)}
              >
                Activate
              </button>
            </td>
          )}

          {!this.checkStatus(company.expiryDate) && (
            <td>
              <span style={{ color: "green" }}>Active</span>
            </td>
          )}
          <td>
            <button
              className="btn btn-sm btn-primary"
              data-id={company.id}
              onClick={this.editCompany.bind(this)}
            >
              Edit
            </button>
          </td>

          <td>
            <button
              className="btn btn-sm btn-danger"
              data-id={company.id}
              onClick={this.deleteCompany.bind(this)}
            >
              Delete
            </button>
          </td>
        </tr>
      ));
    } else {
      companyList = (
        <tr>
          <td>No record found</td>
        </tr>
      );
    }

    //change the page
    const paginate = (pageNumber) => this.setState({ currentPage: pageNumber });

    //work with modal
    let modal = null;
    if (this.state.displayModal) {
      modal = (
        <ActMod
          modState={this.hideDisplay.bind(this)}
          proceedDelete={this.proceedDelete.bind(this)}
          proceedUpdate={this.proceedUpdate.bind(this)}
          proceedCreate={this.proceedCreate.bind(this)}
          proceedActivation={this.proceedActivation.bind(this)}
          company={this.state.company}
          display={this.state.display}
          amount={this.state.amount}
          standard={this.state.standard}
          pro={this.state.pro}
          maxi={this.state.maxi}
          advance={this.state.advance}
        />
      );
    }

    return (
      <Fragment>
        <Alerts hideLoading={this.hideLoading.bind(this)} />
        {modal}
        <div className="row pr-4 mb-3">
          <div className="text-center  " style={loaderStyle}>
            <BeatLoader size={15} color="green" loading />
          </div>
        </div>
        <div className="row mt-3 pl-3 pr-3">
          <div className="col-md-6 pb-2"></div>
          <div className="col-md-6 pb-2">
            <form action="" className="form">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Search"
                  className="form-control"
                  value={this.state.searchValue}
                  onChange={this.searchList.bind(this)}
                />
              </div>
            </form>
          </div>
        </div>
        <div className="row table-responsive boxUp p-3">
          <table className="table table-sm table-striped table-borderless">
            <thead>
              <tr>
                <th>Company Id</th>
                <th>Company Name</th>
                <th>Plan</th>
                <th>Branches</th>
                <th>Status</th>
                <th colSpan="2">Action</th>
              </tr>
            </thead>
            <tbody>{companyList}</tbody>
          </table>
        </div>

        <div className="row mt-4">
          <div className="col text-center">
            <button
              className="btn btn-success"
              onClick={this.addCompany.bind(this)}
            >
              Add Company
            </button>
          </div>
        </div>

        <Pagination
          postsPerPage={this.state.postsPerPage}
          totalPosts={this.state.companies.length}
          paginate={paginate}
        />
      </Fragment>
    );
  }
}

Companies.propTypes = {
  getCompanies: propTypes.func.isRequired,
  getCompany: propTypes.func.isRequired,
  companies: propTypes.array.isRequired,
  getPriceList: propTypes.func.isRequired,
  getPrice: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  companies: state.companies.items,
  company: state.companies.item,
  priceList: state.pricing.items,
  price: state.pricing.item,
});

export default connect(mapStateToProps, {
  getCompanies,
  getCompany,
  createCompany,
  getPriceList,
  getPrice,
})(Companies);

//write modal for this app
const ActMod = (props) => {
  const [isOpen, setIsOpen] = useState(true);
  const [plan, setPlan] = useState(props.company.plan);
  const [name, setName] = useState(props.company.companyName);
  const [companyname, addName] = useState("");
  const [companyplan, addPlan] = useState("");
  const amount = props.amount * 100;
  const [email, setEmail] = useState("");
  const [firstname, setFName] = useState("");
  const [lastname, setLName] = useState("");
  const [phone, setPhone] = useState("");

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
    onSuccess: () => paymentComplete(props.company.id),
    onClose: () => console.log("Wait! You need this oil, don't go!!!!"),
  };
  const showModal = () => {
    setIsOpen(false);
  };

  const hideModal = () => {
    setIsOpen(false);
    props.modState();
  };

  const hideModalWithDelete = (event) => {
    setIsOpen(false);
    props.proceedDelete(event.target.dataset.id);
  };

  const notExpired = (date) => {
    let oldDate = new Date(date);
    let now = new Date();
    now.setHours(0, 0, 0, 0);

    if (oldDate > now) {
      return true;
    } else {
      return false;
    }
  };

  const hideModalWithUpdate = (event) => {
    let id = event.target.dataset.id;
    //prevent move to standard if subscription is still active
    if (
      notExpired(props.company.expiryDate) &&
      plan.toUpperCase() == "STANDARD"
    ) {
      swal({
        text: ` Sorry, you can only change to standard plan when the current subscription for this company has expired.`,
        icon: "warning",
        button: true,
      });
    } else {
      //continue normal process
      //if plan was not changed
      if (plan.toUpperCase() == props.company.plan.toUpperCase()) {
        //just proceed
        setIsOpen(false);
        props.proceedUpdate({ id, name, plan });
      } else {
        let conditionValue = updateCondition(
          plan,
          props.company,
          props.standard,
          props.pro,
          props.maxi,
          props.advance
        );
        if (!conditionValue) {
          setIsOpen(false);
          props.proceedUpdate({ id, name, plan });
        } else {
          swal({
            text: ` Changing to this plan will leave you with a ${conditionValue.daysValue} day worth of service based on your balance with us`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then((value) => {
            if (value) {
              //if user clicks ok
              setIsOpen(false);
              props.proceedUpdate({ id, name, plan }, conditionValue.newExp);
            }
          });
        }
      }
    }
  };

  const hideModalWithCreate = (event) => {
    setIsOpen(false);
    props.proceedCreate({ name: companyname, plan: companyplan });
  };

  const changeSelect = (event) => {
    setPlan(event.target.value);
  };

  const changeName = (event) => {
    setName(event.target.value);
  };

  const changeCompName = (event) => {
    addName(event.target.value);
  };

  const changeCompPlan = (event) => {
    addPlan(event.target.value);
  };

  const paymentComplete = (id) => {
    setIsOpen(false);
    props.proceedActivation(id);
  };

  //check for display type

  let displayBody;
  let btn;
  if (props.display == "edit") {
    displayBody = (
      <form className="form">
        <div className="form-group">
          <input
            placeholder="Company name"
            className="form-control"
            value={name}
            onChange={changeName}
          />
        </div>

        <div className="form-group">
          <select className="form-control" value={plan} onChange={changeSelect}>
            <option value="">select plan</option>
            <option value="standard">Standard</option>
            <option value="premium pro">Premium pro</option>
            <option value="premium maxi">Premium maxi</option>
            <option value="premium advance">Premium advance</option>
          </select>
        </div>
      </form>
    );

    btn = (
      <button
        className="btn btn-sm btn-primary"
        data-id={props.company.id}
        onClick={hideModalWithUpdate}
      >
        Proceed
      </button>
    );
  } else if (props.display == "delete") {
    displayBody = <span>Do you wish to delete this company ?</span>;

    btn = (
      <button
        className="btn btn-sm btn-primary"
        data-id={props.company.id}
        onClick={hideModalWithDelete}
      >
        Proceed
      </button>
    );
  } else if (props.display == "addcompany") {
    displayBody = displayBody = (
      <form className="form">
        <div className="form-group">
          <input
            placeholder="Company name"
            className="form-control"
            value={companyname}
            onChange={changeCompName}
          />
        </div>

        <div className="form-group">
          <select
            className="form-control"
            value={companyplan}
            onChange={changeCompPlan}
          >
            <option value="">select plan</option>
            <option value="standard">Standard</option>
            <option value="premium pro">Premium pro</option>
            <option value="premium maxi">Premium maxi</option>
            <option value="premium advance">Premium advance</option>
          </select>
        </div>
      </form>
    );

    btn = (
      <button className="btn btn-sm btn-primary" onClick={hideModalWithCreate}>
        Done
      </button>
    );
  } else {
    displayBody = displayBody = (
      <form className="form">
        <div className="form-group">
          <input
            placeholder="Firstname"
            className="form-control"
            value={props.company.plan}
            readOnly
          />
        </div>

        <div className="form-group">
          <input
            placeholder="Firstname"
            className="form-control"
            value={props.amount}
            readOnly
          />
        </div>

        <div className="form-group">
          <input
            placeholder="Firstname"
            className="form-control"
            onChange={(e) => setFName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <input
            placeholder="Lastname"
            className="form-control"
            onChange={(e) => setLName(e.target.value)}
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
  }
  return (
    <Modal show={isOpen} onHide={hideModal}>
      <ModalHeader>
        <ModalTitle>Company ID: {props.company.companyId}</ModalTitle>
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
