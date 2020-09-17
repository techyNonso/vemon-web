import React, { Component, Fragment } from "react";
import DateRangeSelect from "Components/dashComponents/dateRangeSelect";
import propTypes from "prop-types";
import { connect } from "react-redux";
import Pagination from "Components/dashComponents/pagination";
import { getSales } from "Store/actions/salesAction";
import { getStocks } from "Store/actions/stockAction";
import { getClearance } from "Store/actions/clearanceAction";
import { getExpenses } from "Store/actions/expenseAction";
import { getDebts } from "Store/actions/debtsAction";

import { extractDates, extractSales } from "Modules/sales";
import { extractDebts } from "Modules/debts";
import { extractClearance } from "Modules/clearance";
import {
  getTotalSalesDetails,
  getDebtDetails,
  getExpenseSum,
  getClearanceDetails,
  generateReport,
} from "Modules/account";
import { extractProductId, getStockArray } from "Modules/stock";

import { extractExpenses } from "Modules/expenses";

class AccountReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      initialStartDate: new Date(),
      loading: false,
      sales: [],
      originalSales: [],
      postsPerPage: 100,
      currentPage: 1,
      searchValue: "",
      report: [],
      originalReport: [],
      originalStocks: [],
      stocks: [],
      originalExpenses: [],
      expenses: [],
      originalClearance: [],
      clearance: [],
      originalDebts: [],
      debts: [],
      total: 0,
      expenseSum: 0,
      debtSum: 0,
      paidSum: 0,
      debtPaid: 0,
      balance: 0,
    };

    //handle props received
    this.handleProps = this.handleProps.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.ifNegative = this.ifNegative.bind(this);
    this.ifPositive = this.ifPositive.bind(this);
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
      let ids = extractProductId(props.stocks);

      let stocks = getStockArray(ids, props.stocks);
      let mainDebts = extractDebts(dates, props.debts);
      let mainExpenses = extractExpenses(dates, props.expenses);
      let mainSales = extractSales(dates, props.sales);
      let mainClearance = extractClearance(dates, props.clearance);
      let [total, paidSum] = getTotalSalesDetails(mainSales);
      let debtSum = getDebtDetails(mainDebts);
      let clearanceSum = getClearanceDetails(mainClearance);
      let expenseSum = getExpenseSum(mainExpenses);

      //get balance paid money + money from debt redemption
      let balance = Number(paidSum + clearanceSum - expenseSum);

      //generate report
      let report = generateReport(
        dates,
        mainDebts,
        mainExpenses,
        mainSales,
        mainClearance,
        stocks
      );

      //set state of activities
      this.setState({
        total: total,
        paidSum: paidSum,
        debtSum: debtSum,
        expenseSum: expenseSum,
        debtPaid: clearanceSum,
        balance,
        loading: false,
        report,
      });
    }
  }

  //wait for when our props arrive
  componentDidUpdate(prevProps, prevState) {
    //now check if sales have arrived
    if (prevProps.sales !== this.props.sales) {
      this.props.getExpenses(
        this.props.company.companyId,
        this.props.branch.branchId
      );
    }

    //check if expenses have arrived
    if (prevProps.expenses !== this.props.expenses) {
      this.props.getClearance(
        this.props.company.companyId,
        this.props.branch.branchId
      );
    }

    //check if clearance have arrived
    if (prevProps.clearance !== this.props.clearance) {
      this.props.getDebts(
        this.props.company.companyId,
        this.props.branch.branchId
      );
    }

    //check if debts have arrived
    if (prevProps.debts !== this.props.debts) {
      this.props.getStocks(
        this.props.company.companyId,
        this.props.branch.branchId
      );
    }

    //check if stocks have arrived
    if (prevProps.stocks !== this.props.stocks) {
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
      this.props.getSales(
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
    this.props.getSales(
      this.props.company.companyId,
      this.props.branch.branchId
    );

    this.setState({
      loading: true,
    });
  }

  ifNegative(gainPercent) {
    return Number(gainPercent) < 0 ? true : false;
  }

  ifPositive(gainPercent) {
    return Number(gainPercent) >= 0 ? true : false;
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
    const currentPosts = this.state.report.slice(
      indexOfFirstPost,
      indexOfLastPost
    );

    let reportList;
    //check list
    if (currentPosts.length > 0) {
      reportList = currentPosts.map((report) => (
        <tr key={report.id}>
          <td>{report.date}</td>
          <td>{report.totalPrice}</td>
          <td>{report.paid}</td>
          <td>{report.debtPaid}</td>
          <td>{report.debt}</td>
          <td>{report.expense}</td>
          <td>{report.balance}</td>
          {this.ifNegative(report.gainPercent) && (
            <td style={{ color: "red" }}>{report.gainPercent} %</td>
          )}
          {this.ifPositive(report.gainPercent) && (
            <td style={{ color: "green" }}>+ {report.gainPercent} %</td>
          )}
          <td>
            <button className="btn btn-sm btn-primary">Detail</button>
          </td>
        </tr>
      ));
    } else {
      reportList = (
        <tr>
          <td>No record found</td>
        </tr>
      );
    }

    //change the page
    const paginate = (pageNumber) => this.setState({ currentPage: pageNumber });

    return (
      <Fragment>
        <div className="row mb-2 pr-3">
          <div className="col-lg-3 mb-4 pl-3 pr-3">
            <div className="showBox">
              <div className="showChild showTop">
                <i
                  className="fa fa-calculator"
                  aria-hidden="true"
                  id="saleVol"
                ></i>
                <span id="span1">{this.state.total}</span>
              </div>
              <div className="showChild">
                <div className="showDown">Total Amount</div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 mb-4 pl-3 pr-3">
            <div className="showBox">
              <div className="showChild showTop">
                <i className="fa fa-money" aria-hidden="true" id="incVol"></i>
                <span id="span4">{this.state.paidSum}</span>
              </div>
              <div className="showChild">
                <div className="showDown">Paid</div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 mb-4 pl-3 pr-3">
            <div className="showBox">
              <div className="showChild showTop">
                <i
                  className="fa fa-credit-card-alt"
                  aria-hidden="true"
                  id="expVol"
                ></i>
                <span id="span2">{this.state.debtSum}</span>
              </div>
              <div className="showChild">
                <div className="showDown">Debt</div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 mb-4 pl-3 pr-3">
            <div className="showBox">
              <div className="showChild showTop">
                <i
                  className="fa fa-minus-square"
                  aria-hidden="true"
                  id="expenVol"
                ></i>
                <span id="span3">{this.state.expenseSum}</span>
              </div>
              <div className="showChild">
                <div className="showDown">Expenses</div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-2 pr-3">
          <div className="col-lg-6 mb-4 pl-3 pr-3">
            <div className="showBox">
              <div className="showChild showTop">
                <i
                  className="fa fa-info-circle"
                  aria-hidden="true"
                  id="invVol"
                ></i>
                <span id="span6">{this.state.debtPaid}</span>
              </div>
              <div className="showChild">
                <div className="showDown">Debt Paid</div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 mb-4 pl-3 pr-3">
            <div className="showBox">
              <div className="showChild showTop">
                <i
                  className="fa fa-line-chart"
                  aria-hidden="true"
                  id="stockVol"
                ></i>
                <span id="span5">{this.state.balance}</span>
              </div>
              <div className="showChild">
                <div className="showDown">Balance</div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-3 pl-3 pr-3">
          <div className="col-md-6 pb-2">
            <span>
              <strong>Branches</strong> : 1 of {this.props.branches.length}
            </span>
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
                <th>Total</th>
                <th>Amount Paid</th>
                <th>Debt Paid</th>
                <th>Debt To Pay</th>
                <th>Expenses</th>
                <th>Balance</th>
                <th>Outcome</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading}

              {reportList}
            </tbody>
          </table>
        </div>

        <Pagination
          postsPerPage={this.state.postsPerPage}
          totalPosts={this.state.report.length}
          paginate={paginate}
        />
      </Fragment>
    );
  }
}

AccountReport.propTypes = {
  getSales: propTypes.func.isRequired,
  getDebts: propTypes.func.isRequired,
  getClearance: propTypes.func.isRequired,
  getExpenses: propTypes.func.isRequired,
  sales: propTypes.array.isRequired,
  getStocks: propTypes.func.isRequired,
  stocks: propTypes.array.isRequired,
  clearance: propTypes.array.isRequired,
  expenses: propTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  stocks: state.stocks.items,
  sales: state.sales.items,
  clearance: state.clearance.items,
  expenses: state.expenses.items,
  debts: state.debts.items,
  branch: state.branches.item,
  company: state.companies.item,
});

export default connect(mapStateToProps, {
  getSales,
  getStocks,
  getClearance,
  getExpenses,
  getDebts,
})(AccountReport);
