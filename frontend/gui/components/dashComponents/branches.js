import React, { Component, Fragment, useState } from "react";
//import DateRangeSelect from "Components/dashComponents/dateRangeSelect";
import propTypes from "prop-types";
import { connect } from "react-redux";
import Pagination from "Components/dashComponents/pagination";
import { getCompanyBranches, getBranch } from "Store/actions/branchAction";
import axios from "axios";
import {
  getSearchResult,
  sortBranches,
  generateBranchId,
} from "Modules/branch";
import axiosInstance from "Modules/axiosInstance";

//import bootstrap component
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";

//loading imports
import { css } from "@emotion/core";
import { BeatLoader } from "react-spinners";

import swal from "sweetalert";

class Branches extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: "none",
      branches: [],
      originalBranches: [],
      postsPerPage: 100,
      currentPage: 1,
      searchValue: "",
      displayModal: false,
      branch: "",
      deleteClick: false,
    };

    this.handleProps = this.handleProps.bind(this);
  }

  handleProps(props) {
    //sort branches
    let sortedList = sortBranches(props.branches);
    this.setState({
      branches: sortedList,
      originalBranches: sortedList,
      loading: "none",
    });
  }

  //add branch
  addBranch() {
    //check branch maximum
    if (
      this.props.company.plan.toUpperCase() == "STANDARD" &&
      this.state.branches.length >= 1
    ) {
      swal({
        title: "You have reached the maximum number of branches for this plan",
        //text :" Name change successful",
        icon: "error",
        button: "OK",
      });
    } else if (
      this.props.company.plan.toUpperCase() == "PREMIUM PRO" &&
      this.state.branches.length >= 3
    ) {
      swal({
        title: "You have reached the maximum number of branches for this plan",
        //text :" Name change successful",
        icon: "error",
        button: "OK",
      });
    } else if (
      this.props.company.plan.toUpperCase() == "PREMIUM MAXI" &&
      this.state.branches.length >= 5
    ) {
      swal({
        title: "You have reached the maximum number of branches for this plan",
        //text :" Name change successful",
        icon: "error",
        button: "OK",
      });
    } else {
      let id = generateBranchId(this.state.branches);

      //declare data
      let data = {
        branchId: id,
        companyId: this.props.company.companyId,
      };
      this.setState({
        loading: "block",
      });

      axiosInstance
        .post(
          `http://127.0.0.1:8000/branches/${this.props.company.companyId}/`,
          data
        )
        .then((res) => {
          //update company branch count

          axiosInstance
            .put(`http://127.0.0.1:8000/companies/${this.props.company.id}/`, {
              branches: this.props.branches.length + 1,
            })
            .then((res) => {
              this.props.getCompanyBranches(this.props.company.companyId);
              this.setState({
                loading: "block",
              });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err.response.data));
    }
  }

  //delete branch
  deleteBranch(event) {
    this.setState({
      deleteClick: true,
    });
    let id = event.target.dataset.id;
    this.props.getBranch(id);
  }

  //proceed to display
  proceedDelete(id) {
    this.setState({
      loading: "block",
      deleteClick: false,
    });

    axiosInstance
      .delete(`http://127.0.0.1:8000/branches/branch/${id}/`)
      .then((res) => {
        //update company with new length
        axiosInstance
          .put(`http://127.0.0.1:8000/companies/${this.props.company.id}/`, {
            branches: this.props.branches.length - 1,
          })
          .then((res) => {
            this.setState({
              displayModal: false,
              loading: "none",
            });
          });

        swal({
          title: "Branch Deleted Successfully",
          //text :" Name change successful",
          icon: "success",
          button: "OK",
        });
        this.props.getCompanyBranches(this.props.company.companyId);
      })
      .catch((err) => console.log(err));
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
        this.state.originalBranches,
        event.target.value
      );

      if (list.length > 0) {
        this.setState({
          branches: list,
          loading: "none",
        });
      } else {
        //set list back to original list
        this.setState({
          branches: [],
          loading: "none",
        });
      }
    } else {
      //if search box is empty
      this.setState({
        branches: this.state.originalBranches,
        loading: "none",
      });
    }
  }

  //wait for when our props arrive
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.branches !== this.props.branches) {
      this.handleProps(this.props);
    }

    if (prevProps.company !== this.props.company) {
      //console.log(this.props.company.companyId, this.props.branch.branchId);

      this.props.getCompanyBranches(this.props.company.companyId);
      this.setState({
        loading: "block",
      });
    }

    //check if activity changes
    if (prevProps.branch !== this.props.branch && this.state.deleteClick) {
      this.setState({ displayModal: true, branch: this.props.branch });
    }
  }

  componentDidMount() {
    //check branches
    if (this.props.branches.length > 0) {
      this.handleProps(this.props);
    } else {
      this.props.getCompanyBranches(this.props.company.companyId);

      this.setState({
        loading: "block",
      });
    }
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
    const currentPosts = this.state.branches.slice(
      indexOfFirstPost,
      indexOfLastPost
    );

    let branchList;
    //check list
    if (currentPosts.length > 0) {
      branchList = currentPosts.map((branch) => (
        <tr key={branch.id}>
          <td>{branch.branchId}</td>
          {/*<td>{branch.state}</td>
          <td>{branch.town}</td>
      <td>{branch.street}</td>*/}
          <td>{branch.address}</td>
          <td>{branch.phone}</td>
          <td>
            <button
              className="btn btn-sm btn-danger"
              data-id={branch.id}
              onClick={this.deleteBranch.bind(this)}
            >
              Delete
            </button>
          </td>
        </tr>
      ));
    } else {
      branchList = (
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
          branch={this.state.branch}
        />
      );
    }
    return (
      <Fragment>
        {modal}
        <div className="row pr-4 mb-3">
          <div className="text-center  " style={loaderStyle}>
            <BeatLoader size={15} color="green" loading />
          </div>
        </div>
        <div className="row mt-3 pl-3 pr-3">
          <div className="col-md-6 pb-2">
            <span>
              <strong>Branches</strong> : 1 of {this.props.branches.length}
            </span>
          </div>

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
                <th>Branch Id</th>
                {/*<th>State</th>
                <th>Town</th>
                <th>Street</th>*/}
                <th>Address</th>
                <th>Phone</th>

                <th>Action</th>
              </tr>
            </thead>
            <tbody>{branchList}</tbody>
          </table>
        </div>

        <div className="row mt-4">
          <div className="col text-center">
            <button
              className="btn btn-success"
              onClick={this.addBranch.bind(this)}
            >
              Add Branch
            </button>
          </div>
        </div>
        <Pagination
          postsPerPage={this.state.postsPerPage}
          totalPosts={this.state.branches.length}
          paginate={paginate}
        />
      </Fragment>
    );
  }
}

Branches.propTypes = {
  getCompanyBranches: propTypes.func.isRequired,
  getBranch: propTypes.func.isRequired,
  branches: propTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  branches: state.branches.items,
  branch: state.branches.item,
  companies: state.companies.items,
  company: state.companies.item,
});

export default connect(mapStateToProps, { getCompanyBranches, getBranch })(
  Branches
);

//write modal for this app
const ActMod = (props) => {
  const [isOpen, setIsOpen] = useState(true);

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
  return (
    <Modal show={isOpen} onHide={hideModal}>
      <ModalHeader>
        <ModalTitle>Branch ID: {props.branch.branchId}</ModalTitle>
      </ModalHeader>

      <ModalBody>Do you wish to delete this branch ?</ModalBody>
      <ModalFooter>
        <button className="btn btn-sm btn-secondary" onClick={hideModal}>
          Cancel
        </button>

        <button
          className="btn btn-sm btn-primary"
          data-id={props.branch.id}
          onClick={hideModalWithDelete}
        >
          Proceed
        </button>
      </ModalFooter>
    </Modal>
  );
};
