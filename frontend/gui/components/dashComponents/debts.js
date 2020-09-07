import React, { Component, Fragment } from "react";
import DateRangeSelect from "Components/dashComponents/dateRangeSelect";
import propTypes from "prop-types";
import { connect } from "react-redux";
import Pagination from "Components/dashComponents/pagination";
import { getDebts } from "Store/actions/debtsAction";

import {
  extractDates,
  extractDebts,
  getOthers,
  getSearchResult,
} from "Modules/debts";

class Debts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      initialStartDate: new Date(),
      loading: false,
      debts: [],
      originalDebts: [],
      postsPerPage: 1,
      currentPage: 1,
      searchValue: "",
      total: "",
      paid: "",
      balance: "",
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
      let mainDebts = extractDebts(dates, props.debts);

      //get others
      let [total, paid, balance] = getOthers(mainDebts);
      //set state of activities
      this.setState({
        debts: mainDebts,
        originalDebts: mainDebts,
        loading: false,
        balance: balance,
        total: total,
        paid: paid,
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
      let list = getSearchResult(this.state.originalDebts, event.target.value);

      if (list.length > 0) {
        this.setState({
          debts: list,
          loading: false,
        });
      } else {
        //set list back to original list
        this.setState({
          debts: [],
          loading: false,
        });
      }
    } else {
      //if search box is empty
      this.setState({
        debts: this.state.originalDebts,
        loading: false,
      });
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
      this.setState({
        loading: true,
      });
      this.props.getDebts(
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
    this.props.getDebts(
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
          <td>{debt.customer}</td>
          <td>{debt.phone}</td>
          <td>{debt.attender}</td>
          <td>{debt.amount}</td>
          <td>{debt.paid}</td>
          <td>{debt.balance}</td>
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
                <th>Customer</th>
                <th>Phone</th>
                <th>Attender</th>
                <th>Amount</th>
                <th>Paid</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {loading}

              {debtsList}
            </tbody>
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
                <td>{this.state.total}</td>

                <td>{this.state.paid} </td>
                <td>{this.state.balance}</td>
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
