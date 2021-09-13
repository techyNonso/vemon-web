import React, { Component, Fragment } from "react";
import DateRangeSelect from "Components/dashComponents/dateRangeSelect";
import propTypes from "prop-types";
import { connect } from "react-redux";
import Pagination from "Components/dashComponents/pagination";
import { getDebts } from "Store/actions/debtsAction";
import Formatter from "Components/dashComponents/Formatter";
import swal from "sweetalert";
import {
  extractDates,
  extractDebts,
  getOthers,
  getSearchResult,
} from "Modules/debts";

//loading imports
import { css } from "@emotion/core";
import { BeatLoader } from "react-spinners";

class Debts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      initialStartDate: new Date(),
      initialEndDate: new Date(),
      loading: "none",
      debts: [],
      originalDebts: [],
      postsPerPage: 100,
      currentPage: 1,
      searchValue: "",
      total: "",
      paid: "",
      balance: "",
    };
    //handle props received
    this.handleProps = this.handleProps.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.checkStatus = this.checkStatus.bind(this);
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

  handleProps(props) {
    //check if both dates are not null
    let startDate = this.state.startDate;
    if (startDate == null) {
      startDate = this.state.initialStartDate;
    }
    let endDate = this.state.endDate;
    if (startDate !== null && endDate !== null) {
      let mainDebts = props.debts;

      //get others
      let [total, paid, balance] = getOthers(mainDebts);
      //set state of activities
      this.setState({
        debts: mainDebts,
        originalDebts: mainDebts,
        loading: "none",
        balance: balance,
        total: total,
        paid: paid,
      });
    }
  }

  //check balance status
  checkStatus(balance) {
    if (Number(balance) > 0) {
      return "Pending";
    } else {
      return "Cleared";
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
      let list = getSearchResult(this.state.originalDebts, event.target.value);

      if (list.length > 0) {
        this.setState({
          debts: list,
          loading: "none",
        });
      } else {
        //set list back to original list
        this.setState({
          debts: [],
          loading: "none",
        });
      }
    } else {
      //if search box is empty
      this.setState({
        debts: this.state.originalDebts,
        loading: "none",
      });
    }
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
    if (prevProps.debts !== this.props.debts) {
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
      this.props.getDebts(
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

      this.props.getDebts(
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
    if (this.checkDateStatus(this.props.company.expiryDate)) {
      swal({
        title: "Data error",
        text: `You need to clear all bills associated with ${this.props.company.companyId} before you can access this data.`,
        icon: "error",
        button: "OK",
      });

      return;
    }
    this.props.getDebts(
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
    const currentPosts = this.state.debts.slice(
      indexOfFirstPost,
      indexOfLastPost
    );

    let debtsList;
    //check list
    if (currentPosts.length > 0) {
      debtsList = currentPosts.map((debt) => (
        <tr key={debt.id}>
          <td>{debt.date}</td>
          <td>{debt.customer_name}</td>
          <td>{debt.customer_number}</td>
          <td>{debt.attender}</td>
          <td>{debt.net_price}</td>
          <td>{debt.paid}</td>
          <td>{debt.balance}</td>

          {this.checkStatus(debt.balance) == "Pending" && (
            <td>
              <span style={{ color: "red" }}>Pending</span>
            </td>
          )}

          {this.checkStatus(debt.balance) == "Cleared" && (
            <td>
              <span style={{ color: "green" }}>Cleared</span>
            </td>
          )}
        </tr>
      ));
    } else {
      debtsList = (
        <tr>
          <td>No record found</td>
        </tr>
      );
    }

    //change the page
    const paginate = (pageNumber) => this.setState({ currentPage: pageNumber });

    return (
      <Fragment>
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
                <th>Customer</th>
                <th>Phone</th>
                <th>Attender</th>
                <th>Amount</th>
                <th>Paid</th>
                <th>Balance</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>{debtsList}</tbody>
          </table>
        </div>

        <Pagination
          postsPerPage={this.state.postsPerPage}
          totalPosts={this.state.debts.length}
          paginate={paginate}
        />

        <div className="row table-responsive boxUp p-3 mt-4">
          <table className="table table-sm table-striped table-borderless">
            <thead>
              <tr>
                <th>Total</th>

                <th>Paid</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{Formatter.format(this.state.total)}</td>

                <td>{Formatter.format(this.state.paid)} </td>
                <td>{Formatter.format(this.state.balance)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Fragment>
    );
  }
}

Debts.propTypes = {
  getDebts: propTypes.func.isRequired,
  debts: propTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  debts: state.debts.items,
  branch: state.branches.item,
  company: state.companies.item,
});

export default connect(mapStateToProps, { getDebts })(Debts);
