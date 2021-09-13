import React, { Component, Fragment } from "react";
import DateRangeSelect from "Components/dashComponents/dateRangeSelect";
import propTypes from "prop-types";
import { connect } from "react-redux";
import Pagination from "Components/dashComponents/pagination";
import { getExpenses } from "Store/actions/expenseAction";
import Formatter from "Components/dashComponents/Formatter";

import {
  extractDates,
  extractExpenses,
  getOthers,
  getSearchResult,
} from "Modules/expenses";

//loading imports
import { css } from "@emotion/core";
import { BeatLoader } from "react-spinners";

class Expenses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      initialStartDate: new Date(),
      initialEndDate: new Date(),
      loading: "none",
      expenses: [],
      originalExpenses: [],
      postsPerPage: 100,
      currentPage: 1,
      searchValue: "",
      total: "",
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

  handleProps(props) {
    //check if both dates are not null
    let startDate = this.state.startDate;
    if (startDate == null) {
      startDate = this.state.initialStartDate;
    }
    let endDate = this.state.endDate;
    if (startDate !== null && endDate !== null) {
      let dates = extractDates(startDate, endDate);
      let mainExpenses = extractExpenses(dates, props.expenses);

      //get others
      let total = getOthers(mainExpenses);
      //set state of activities
      this.setState({
        expenses: mainExpenses,
        originalExpenses: mainExpenses,
        loading: "none",

        total: total,
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
        this.state.originalExpenses,
        event.target.value
      );

      if (list.length > 0) {
        this.setState({
          expenses: list,
          loading: "none",
        });
      } else {
        //set list back to original list
        this.setState({
          expenses: [],
          loading: "none",
        });
      }
    } else {
      //if search box is empty
      this.setState({
        expenses: this.state.originalExpenses,
        loading: "none",
      });
    }
  }

  //wait for when our props arrive
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.expenses !== this.props.expenses) {
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
      this.props.getExpenses(
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
      this.props.getExpenses(
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
    this.props.getExpenses(
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
    const currentPosts = this.state.expenses.slice(
      indexOfFirstPost,
      indexOfLastPost
    );

    let expenseList;
    //check list
    if (currentPosts.length > 0) {
      expenseList = currentPosts.map((expense) => (
        <tr key={expense.id}>
          <td>{expense.date}</td>
          <td>{expense.name}</td>
          <td>{expense.description}</td>
          <td>{expense.amount}</td>
        </tr>
      ));
    } else {
      expenseList = (
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
                <th>Name</th>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>{expenseList}</tbody>
          </table>
        </div>

        <Pagination
          postsPerPage={this.state.postsPerPage}
          totalPosts={this.state.expenses.length}
          paginate={paginate}
        />

        <div className="row table-responsive boxUp p-3 mt-4">
          <table className="table table-sm table-striped table-borderless">
            <thead>
              <tr>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{Formatter.format(this.state.total)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Fragment>
    );
  }
}

Expenses.propTypes = {
  getExpenses: propTypes.func.isRequired,
  expenses: propTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.expenses.items,
  branch: state.branches.item,
  company: state.companies.item,
});

export default connect(mapStateToProps, { getExpenses })(Expenses);
