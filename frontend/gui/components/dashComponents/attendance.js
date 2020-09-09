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

class Attendance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      initialStartDate: new Date(),
      loading: false,
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

    if (data.startDate !== null) {
      this.setState({
        initialStartDate: data.startDate,
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
      let dates = extractDates(startDate, endDate);
      let mainAttendance = extractAttendance(dates, props.allAttendance);
      //sort
      let sortedAttendance = sortStaff(mainAttendance);
      //set state of
      this.setState({
        allAttendance: sortedAttendance,
        originalAllAttendance: sortedAttendance,
        loading: false,
      });
    }
  }

  //search starting from first page
  searchList(event) {
    this.setState({
      searchValue: event.target.value,
      currentPage: 1,
      loading: true,
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
          loading: false,
        });
      } else {
        //set list back to original list
        this.setState({
          allAttendance: [],
          loading: false,
        });
      }
    } else {
      //if search box is empty
      this.setState({
        allAttendance: this.state.originalAllAttendance,
        loading: false,
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
      this.setState({
        loading: true,
      });
      this.props.getAllAttendance(
        this.props.company.companyId,
        this.props.branch.branchId
      );
    }

    //check for date change
    if (
      prevState.startDate !== this.state.startDate ||
      prevState.endDate !== this.state.endDate
    ) {
      //handle the new props
      this.handleProps(this.props);
    }
  }

  componentDidMount() {
    this.props.getAllAttendance(
      this.props.company.companyId,
      this.props.branch.branchId
    );
    this.setState({
      loading: true,
    });
  }

  render() {
    let loading;
    if (this.state.loading) {
      loading = (
        <tr>
          <td>please wait...</td>
        </tr>
      );
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

        <div className="row justify-content-center pb-4">
          <DateRangeSelect style={"zIndex:1000"} parentFunc={this.handleDate} />
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
              {loading}

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
