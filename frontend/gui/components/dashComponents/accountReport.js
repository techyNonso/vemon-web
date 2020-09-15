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

import {
  extractProductId,
  getStockArray,
  generateProductReport,
  getReportSearchResult,
} from "Modules/stock";

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
      /* let [total, paid, balance] = getOthers(mainDebts);
      //set state of activities
      this.setState({
        debts: mainDebts,
        originalDebts: mainDebts,
        loading: false,
        balance: balance,
        total: total,
        paid: paid,
      });*/
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

  render() {
    return (
      <div>
        <div className="row mb-2 pr-3">
          <div className="col-lg-3 mb-4 pl-3 pr-3">
            <div className="showBox">
              <div className="showChild showTop">
                <i
                  className="fa fa-calculator"
                  aria-hidden="true"
                  id="saleVol"
                ></i>
                <span id="span1">0</span>
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
                <span id="span4">0</span>
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
                <span id="span2">0</span>
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
                <span id="span3">0</span>
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
                <span id="span6">0</span>
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
                <span id="span5">0</span>
              </div>
              <div className="showChild">
                <div className="showDown">Balance</div>
              </div>
            </div>
          </div>
        </div>

        <div className="row table-responsive boxUp p-3">
          <div className="container px-1 px-sm-5 mx-auto mb-4">
            <form autoComplete="off">
              <span className="sortBox">sort By date:</span>
              <div className="flex-row d-flex justify-content-center">
                <div className="col-lg-6 col-11">
                  <div className="input-group input-daterange">
                    <input
                      type="text"
                      className="form-control input1"
                      placeholder="Start Date"
                      readOnly={true}
                    />
                    <input
                      type="text"
                      className="form-control input2"
                      placeholder="End Date"
                      readOnly={true}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
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
              <tr>
                <td>02-12-2020</td>
                <td>2000</td>
                <td>1200</td>
                <td>1000</td>
                <td>500</td>
                <td>100</td>
                <td>200</td>
                <td>+20%</td>
                <td>
                  <button className="btn btn-sm btn-primary">Detail</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <ul className="pagination justify-content-end pr-3 pt-3">
          <li className="page-item">
            <a href="#" className="page-link">
              Previous
            </a>
          </li>
          <li className="page-item active">
            <a href="#" className="page-link">
              2
            </a>
          </li>
          <li className="page-item">
            <a href="#" className="page-link">
              Next
            </a>
          </li>
        </ul>
      </div>
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
