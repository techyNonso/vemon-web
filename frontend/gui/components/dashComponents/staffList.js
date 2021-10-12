import React, { Component, Fragment } from "react";
//import DateRangeSelect from "Components/dashComponents/dateRangeSelect";
import propTypes from "prop-types";
import { connect } from "react-redux";
import Pagination from "Components/dashComponents/pagination";
import { getAllStaff, getStaff } from "Store/actions/staffAction";
import axios from "axios";
import { getSearchResult, sortStaff } from "Modules/staff";
import WebSocketInstance from "Modules/websocket";
import swal from "sweetalert";

class StaffList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      initialStartDate: new Date(),
      loading: false,
      allStaff: [],
      staff: "",
      originalAllStaff: [],
      postsPerPage: 100,
      currentPage: 1,
      searchValue: "",
    };
    //handle props received
    this.handleProps = this.handleProps.bind(this);
  }

  handleProps(props) {
    //sort to ensure position is maintained
    let sortedStaff = sortStaff(props.allStaff);
    this.setState({
      allStaff: sortedStaff,
      originalAllStaff: sortedStaff,
      loading: false,
    });
  }

  setMessages(messages) {
    console.log(messages, "set");
  }

  addMessage(message) {
    console.log(message, "add");
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
      let list = getSearchResult(
        this.state.originalAllStaff,
        event.target.value
      );

      if (list.length > 0) {
        this.setState({
          allStaff: list,
          loading: false,
        });
      } else {
        //set list back to original list
        this.setState({
          allStaff: [],
          loading: false,
        });
      }
    } else {
      //if search box is empty
      this.setState({
        allStaff: this.state.originalAllStaff,
        loading: false,
      });
    }
  }

  checkStatus(access) {
    return access.toUpperCase() == "OPEN"
      ? "Open"
      : access.toUpperCase() == "CLOSED"
      ? "Closed"
      : "";
  }

  //wait for when our props arrive
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.allStaff !== this.props.allStaff) {
      this.handleProps(this.props);
    }

    if (
      prevProps.company !== this.props.company ||
      prevProps.branch !== this.props.branch
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
      //connect to web socket staff room
      WebSocketInstance.connect(
        this.props.company.companyId,
        this.props.branch.branchId
      );

      //console.log(this.props.company.companyId, this.props.branch.branchId);
      this.setState({
        loading: true,
      });
      this.props.getAllStaff(
        this.props.company.companyId,
        this.props.branch.branchId
      );
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

    //connect to web socket staff room
    WebSocketInstance.connect(
      this.props.company.companyId,
      this.props.branch.branchId
    );

    this.props.getAllStaff(
      this.props.company.companyId,
      this.props.branch.branchId
    );
    this.setState({
      loading: true,
    });
  }

  changeAccess(event) {
    let id = event.target.dataset.staff;
    let staffId = event.target.dataset.staffid;
    let command = event.target.dataset.command;

    let data = {
      access: command == "activate" ? "open" : "closed",
    };

    this.setState({
      loading: true,
    });
    axios
      .put(`http://127.0.0.1:8000/staff/${id}/`, data)
      .then((res) => {
        //send access message
        WebSocketInstance.sendMessage({
          command: "new_message",
          staffId,
          permission: data.access,
          section: "staff_update",
          companyId: this.props.company.companyId,
          branchId: this.props.branch.branchId,
        });
        this.props.getAllStaff(
          this.props.company.companyId,
          this.props.branch.branchId
        );
      })
      .catch((err) => {
        this.setState({
          loading: false,
        });

        console.log(err);
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
    const currentPosts = this.state.allStaff.slice(
      indexOfFirstPost,
      indexOfLastPost
    );

    let staffList;
    //check list
    if (currentPosts.length > 0) {
      staffList = currentPosts.map((staff) => (
        <tr key={staff.id}>
          <td>{staff.staffId}</td>
          <td>{staff.staffName}</td>
          <td>{staff.email}</td>
          <td>
            {staff.position.charAt(0).toUpperCase() + staff.position.slice(1)}
          </td>
          <td>{staff.phone}</td>
          <td>
            {staff.street},{staff.town}, {staff.state}
          </td>
          <td>{staff.permission}</td>
          <td>{staff.registered}</td>

          {this.checkStatus(staff.access) == "Open" && (
            <td>
              <button
                className="btn btn-sm btn-danger"
                data-command="block"
                data-staff={staff.id}
                data-staffid={staff.staffId}
                onClick={this.changeAccess.bind(this)}
              >
                Block
              </button>
            </td>
          )}

          {this.checkStatus(staff.access) == "Closed" && (
            <td>
              <button
                className="btn btn-sm btn-success w-100"
                data-command="activate"
                data-staff={staff.id}
                data-staffid={staff.staffId}
                onClick={this.changeAccess.bind(this)}
              >
                Activate
              </button>
            </td>
          )}
        </tr>
      ));
    } else {
      staffList = (
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
        <div className="row table-responsive boxUp p-3">
          <table className="table table-sm table-striped table-borderless">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Position</th>

                <th>Phone</th>
                <th>Address</th>
                <th>Permission</th>
                <th>Registered</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading}

              {staffList}
            </tbody>
          </table>
        </div>

        <Pagination
          postsPerPage={this.state.postsPerPage}
          totalPosts={this.state.allStaff.length}
          paginate={paginate}
        />
      </Fragment>
    );
  }
}

StaffList.propTypes = {
  getAllStaff: propTypes.func.isRequired,
  allStaff: propTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  allStaff: state.staff.items,
  staff: state.staff.item,
  branch: state.branches.item,
  company: state.companies.item,
});

export default connect(mapStateToProps, { getAllStaff, getStaff })(StaffList);
