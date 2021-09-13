import React, { Component, Fragment, useState, useEffect } from "react";
import DateRangeSelect from "Components/dashComponents/dateRangeSelect";
import propTypes from "prop-types";
import { connect } from "react-redux";
import Pagination from "Components/dashComponents/pagination";
import { getActivities, getActivity } from "Store/actions/activitiesAction";
import SingleDatePicker from "Components/dashComponents/singleDatePicker";
import {
  extractDates,
  extractActivities,
  getActSearchResult,
} from "Modules/stock";

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

class StockActivities extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      initialStartDate: new Date(),
      initialEndDate: new Date(),
      loading: "none",
      activities: [],
      originalActivities: [],
      activity: "",
      postsPerPage: 100,
      currentPage: 1,
      searchValue: "",
      displayModal: false,
      date: new Date(),
    };
    //handle props received
    this.handleProps = this.handleProps.bind(this);
    this.handleDate = this.handleDate.bind(this);
  }

  handleDate(data) {
    this.setState({
      startDate: data.startDate,
      endDate: data.endDate,
    });

    if (data.startDate == null && data.endDate == null) {
      this.setState({
        startDate: new Date(),
        endDate: new Date(),
      });
    } else if (data.startDate == null && data.endDate !== null) {
      this.setState({
        initialStartDate: data.endDate,
        initialEndDate: data.endDate,
      });
    } else if (data.startDate !== null && data.endDate == null) {
      this.setState({
        initialStartDate: data.startDate,
        initialEndDate: data.startDate,
      });
    } else if (data.startDate !== null && data.endDate !== null) {
      this.setState({
        initialStartDate: data.startDate,
        initialEndDate: data.endDate,
      });
    }
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
      let list = getActSearchResult(
        this.state.originalActivities,
        event.target.value
      );

      if (list.length > 0) {
        this.setState({
          activities: list,
          loading: "none",
        });
      } else {
        //set list back to original list
        this.setState({
          activities: [],
          loading: "none",
        });
      }
    } else {
      //if search box is empty
      this.setState({
        activities: this.state.originalActivities,
        loading: "none",
      });
    }
  }

  //format the data into a displayable
  handleProps(props) {
    //check if both dates are not null
    let startDate = this.state.startDate;
    if (startDate == null) {
      startDate = this.state.initialStartDate;
    }
    let endDate = this.state.endDate;
    if (startDate !== null && endDate !== null) {
      //set state of activities
      this.setState({
        activities: props.activities,
        originalActivities: props.activities,
        loading: "none",
      });
    }
  }

  //change modal state to false
  hideDisplay() {
    this.setState({
      displayModal: false,
    });
  }

  showActivity(event) {
    let id = event.target.dataset.id;
    this.props.getActivity(id);
  }

  checkDateStatus(date) {
    let oldDate = new Date(date);
    let now = new Date();
    now.setHours(0, 0, 0, 0);

    if (oldDate < now) {
      return true;
    } else {
      return false;
    }
  }

  //wait for when our props arrive
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.activities !== this.props.activities) {
      this.handleProps(this.props);
    }

    if (
      prevProps.company !== this.props.company ||
      prevProps.branch !== this.props.branch
    ) {
      //console.log(this.props.company.companyId, this.props.branch.branchId);
      if (this.checkDateStatus(this.props.company.expiryDate)) {
        swal({
          title: "Data error",
          text: `You need to clear all bills associated with ${this.props.company.companyId} before you can access this data.`,
          icon: "error",
          button: "OK",
        });

        return;
      }

      this.props.getActivities(
        this.props.company.companyId,
        this.props.branch.branchId,
        this.state.initialStartDate,
        this.state.initialEndDate
      );
      this.setState({
        loading: "block",
      });
    }

    //check for date change
    if (
      prevState.startDate !== this.state.startDate ||
      prevState.endDate !== this.state.endDate
    ) {
      if (this.checkDateStatus(this.props.company.expiryDate)) {
        swal({
          title: "Data error",
          text: `You need to clear all bills associated with ${this.props.company.companyId} before you can access this data.`,
          icon: "error",
          button: "OK",
        });

        return;
      }
      this.props.getActivities(
        this.props.company.companyId,
        this.props.branch.branchId,
        this.state.initialStartDate,
        this.state.initialEndDate
      );

      this.setState({
        loading: "block",
      });
    }

    //check if activity changes
    if (prevProps.activity !== this.props.activity) {
      this.setState({ displayModal: true, activity: this.props.activity });
    }
  }

  componentDidMount() {
    if (this.checkDateStatus(this.props.company.expiryDate)) {
      swal({
        title: "Data error",
        text: `You need to clear all bills associated with ${this.props.company.companyId} before you can access this data.`,
        icon: "error",
        button: "OK",
      });

      return;
    }
    this.props.getActivities(
      this.props.company.companyId,
      this.props.branch.branchId,
      this.state.initialStartDate,
      this.state.initialEndDate
    );
    this.setState({
      loading: "block",
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
    const currentPosts = this.state.activities.slice(
      indexOfFirstPost,
      indexOfLastPost
    );

    let activitiesList;
    //check list
    if (currentPosts.length > 0) {
      activitiesList = currentPosts.map((act) => (
        <tr key={act.id}>
          <td>{act.date}</td>
          <td>{act.editorId}</td>
          <td>{act.editor}</td>
          <td>{act.activity}</td>

          <td>
            <button
              className="btn btn-secondary btn-sm"
              data-id={act.id}
              onClick={this.showActivity.bind(this)}
            >
              Detail
            </button>
          </td>
        </tr>
      ));
    } else {
      activitiesList = (
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
          act={this.state.activity}
        />
      );
    }
    return (
      <Fragment>
        <div className="row pr-4 mb-3">
          <div className="text-center  " style={loaderStyle}>
            <BeatLoader size={15} color="green" loading />
          </div>
        </div>
        {modal}
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
        <div
          className="row justify-content-center pb-4"
          style={{ zIndex: "100", position: "relative" }}
        >
          <DateRangeSelect parentFunc={this.handleDate} />
        </div>
        <div className="row table-responsive boxUp p-3">
          <table className="table table-sm table-striped table-borderless">
            <thead>
              <tr>
                <th>Date</th>
                <th>Staff Id</th>
                <th>Staff Name</th>
                <th>Activity</th>

                <th>Action</th>
              </tr>
            </thead>
            <tbody>{activitiesList}</tbody>
          </table>
        </div>

        <Pagination
          postsPerPage={this.state.postsPerPage}
          totalPosts={this.state.activities.length}
          paginate={paginate}
        />
      </Fragment>
    );
  }
}

StockActivities.propTypes = {
  getActivities: propTypes.func.isRequired,
  getActivity: propTypes.func.isRequired,
  activities: propTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  activities: state.activities.items,
  activity: state.activities.item,
  branch: state.branches.item,
  company: state.companies.item,
});

export default connect(mapStateToProps, { getActivities, getActivity })(
  StockActivities
);

//write modal for this app
const ActMod = (props) => {
  const [isOpen, setIsOpen] = useState(true);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
    props.modState();
  };
  return (
    <Modal show={isOpen} onHide={hideModal}>
      <ModalHeader>
        <ModalTitle>Batch ID: {props.act.batchId}</ModalTitle>
      </ModalHeader>

      <ModalBody>{props.act.detail}</ModalBody>
      <ModalFooter>
        <button className="btn btn-sm btn-primary" onClick={hideModal}>
          Okay
        </button>
      </ModalFooter>
    </Modal>
  );
};
