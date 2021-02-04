import React, { Component, Fragment } from "react";
import DateRangeSelect from "Components/dashComponents/dateRangeSelect";
import propTypes from "prop-types";
import { connect } from "react-redux";
import Pagination from "Components/dashComponents/pagination";
import { getAllAttendance } from "Store/actions/attendanceAction";
import axios from "axios";
import {
  getAttendanceSearchResult,
  sortStaff,
  extractDates,
  extractAttendance,
} from "Modules/staff";

//loading imports
import {css} from '@emotion/core'
import {BeatLoader} from 'react-spinners'

class Attendance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      initialStartDate: new Date(),
      initialEndDate: new Date(),
      loading: "none",
      allAttendance: [],
      originalAllAttendance: [],
      postsPerPage: 100,
      currentPage: 1,
      searchValue: "",
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

    if (data.startDate == null && data.endDate !== null) {
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

  handleProps(props) {
    //check if both dates are not null
    let startDate = this.state.startDate;
    if (startDate == null) {
      startDate = this.state.initialStartDate;
    }
    let endDate = this.state.endDate;
    if (startDate !== null && endDate !== null) {
      let mainAttendance = props.allAttendance;
      //sort
      let sortedAttendance = sortStaff(mainAttendance);
      //set state of
      this.setState({
        allAttendance: sortedAttendance,
        originalAllAttendance: sortedAttendance,
        loading: "none",
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
      let list = getAttendanceSearchResult(
        this.state.originalAllAttendance,
        event.target.value
      );

      if (list.length > 0) {
        this.setState({
          allAttendance: list,
          loading: "none",
        });
      } else {
        //set list back to original list
        this.setState({
          allAttendance: [],
          loading: "none",
        });
      }
    } else {
      //if search box is empty
      this.setState({
        allAttendance: this.state.originalAllAttendance,
        loading: "none",
      });
    }
  }

  //wait for when our props arrive
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.allAttendance !== this.props.allAttendance) {
      this.handleProps(this.props);
    }

    if (
      prevProps.company !== this.props.company ||
      prevProps.branch !== this.props.branch
    ) {
      //console.log(this.props.company.companyId, this.props.branch.branchId);
      
      this.props.getAllAttendance(
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
      this.props.getAllAttendance(
        this.props.company.companyId,
        this.props.branch.branchId,
        this.state.initialStartDate,
        this.state.initialEndDate
      );

      this.setState({
        loading: "block",
      });
    }
  }

  componentDidMount() {
    this.props.getAllAttendance(
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
      "width":"200px",
      "position":"fixed",
      "zIndex":"1000",
      "left":"50%",
      "marginLeft":"-100px",
      "display":this.state.loading
    }

    //get current stocks
    const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
    const currentPosts = this.state.allAttendance.slice(
      indexOfFirstPost,
      indexOfLastPost
    );

    let attendanceList;
    //check list
    if (currentPosts.length > 0) {
      attendanceList = currentPosts.map((attendance) => (
        <tr key={attendance.id}>
          <td>{attendance.date}</td>
          <td>{attendance.staffId}</td>
          <td>{attendance.staffName}</td>
          <td>{attendance.arrivalTime}</td>
          <td>{attendance.exitTime}</td>
        </tr>
      ));
    } else {
      attendanceList = (
        <tr>
          <td>No record found</td>
        </tr>
      );
    }

    //change the page
    const paginate = (pageNumber) => this.setState({ currentPage: pageNumber });

    return (
      <Fragment>
        <div className="row pr-4 mb-3" >
          <div className="text-center  " style={loaderStyle} ><BeatLoader size={15} color="green" loading /></div>
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

        <div className="row text-center justify-content-center">Sort Date</div>
        <div
          className="row justify-content-center pb-4 "
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
                <th>Arrival Time</th>
                <th>Exit Time</th>
              </tr>
            </thead>
            <tbody>
             {attendanceList}
            </tbody>
          </table>
        </div>

        <Pagination
          postsPerPage={this.state.postsPerPage}
          totalPosts={this.state.allAttendance.length}
          paginate={paginate}
        />
      </Fragment>
    );
  }
}

Attendance.propTypes = {
  getAllAttendance: propTypes.func.isRequired,
  allAttendance: propTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  allAttendance: state.attendance.items,

  branch: state.branches.item,
  company: state.companies.item,
});

export default connect(mapStateToProps, { getAllAttendance })(Attendance);
