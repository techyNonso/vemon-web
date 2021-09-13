import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getSalesPerCompany } from "Store/actions/salesAction";
import { getStocks } from "Store/actions/stockAction";
import { getInvoicesPerCompany } from "Store/actions/invoicesAction";
import { getClearancePerCompany } from "Store/actions/clearanceAction";
import { getExpensesPerCompany } from "Store/actions/expenseAction";
import { getDebtsPerCompany } from "Store/actions/debtsAction";
import LineChart from "Components/dashComponents/Charts/lineChart";
import BarChart from "Components/dashComponents/Charts/barChart";
import MyCalendar from "Components/dashComponents/Charts/calendar";
import Formatter from "Components/dashComponents/Formatter";

import { extractDates } from "Modules/sales";
import { extractDebts } from "Modules/debts";
import { extractClearance } from "Modules/clearance";
import {
  getTotalInvoicesDetails,
  getDebtDetails,
  getExpenseSum,
  getClearanceDetails,
  generateReport,
  extractSales,
  getMonthlySalesReport,
  getMonthlyAnalysis,
  getBranchPerformance,
} from "Modules/account";
import { extractProductId, getStockArray } from "Modules/stock";

import { extractExpenses } from "Modules/expenses";

//loading imports
import { css } from "@emotion/core";
import { BeatLoader } from "react-spinners";
import SingleDatePicker from "./singleDatePicker";
import swal from "sweetalert";

class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(new Date().getFullYear(), 0, 1),
      endDate: new Date(new Date().getFullYear(), 11, 31),
      initialStartDate: new Date(new Date().getFullYear(), 0, 1),
      initialEndDate: new Date(new Date().getFullYear(), 11, 31),
      loading: "none",
      displayModal: false,
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
      lastDate: "",
      lastSale: "",
      lastCost: "",
      lastGain: "",
      currentGain: "",
      currentCost: "",
      currentSale: "",
      currentDate: "",
      percentDiff: "",
      monthlySales: {},
      monthlyAnalysis: {},
      branchPerformance: [],
    };
  }

  handleProps(props) {
    //check if both dates are not null
    let startDate = this.state.startDate;
    if (startDate == null) {
      startDate = this.state.initialStartDate;
    }
    let endDate = this.state.endDate;
    if (startDate !== null && endDate !== null) {
      // console.log(startDate, endDate)
      let dates = extractDates(startDate, endDate);
      //let ids = extractProductId(props.stocks);

      // let stocks = getStockArray(ids, props.stocks);
      let mainDebts = props.debts;
      let mainExpenses = props.expenses;
      let mainSales = props.sales;
      let mainClearance = props.clearance;
      let mainInvoices = props.invoices;
      let [total, paidSum] = getTotalInvoicesDetails(mainInvoices);
      let debtSum = getDebtDetails(mainDebts);
      let clearanceSum = getClearanceDetails(mainClearance);
      let expenseSum = getExpenseSum(mainExpenses);

      //sort sales based on month
      let monthlySalesReport = getMonthlySalesReport(mainSales);

      //get sales analysis based on month
      let monthlyAnalysis = getMonthlyAnalysis(mainSales);

      //get branch performance
      let branchPerformance = getBranchPerformance(props.branches, mainSales);

      //get balance paid money + money from debt redemption
      let balance = Number(paidSum + clearanceSum);

      //generate report
      // let report = generateReport(
      //   dates,
      //  mainDebts,
      //   mainExpenses,
      //   mainSales,
      //   mainClearance,
      //   stocks
      // );

      //set state of activities
      this.setState({
        total: total,
        paidSum: paidSum,
        debtSum: debtSum,
        expenseSum: expenseSum,
        debtPaid: clearanceSum,
        balance,
        loading: "none",
        //report,
        monthlySales: monthlySalesReport,
        monthlyAnalysis,
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
    //now check if sales have arrived
    if (prevProps.sales !== this.props.sales) {
      this.props.getExpensesPerCompany(
        this.props.company.companyId,
        this.state.initialStartDate,
        this.state.initialEndDate
      );
    }

    //check if expenses have arrived
    if (prevProps.expenses !== this.props.expenses) {
      this.props.getClearancePerCompany(
        this.props.company.companyId,
        this.state.initialStartDate,
        this.state.initialEndDate
      );
    }

    //check if clearance have arrived
    if (prevProps.clearance !== this.props.clearance) {
      this.props.getInvoicesPerCompany(
        this.props.company.companyId,
        this.state.initialStartDate,
        this.state.initialEndDate
      );
    }

    //check if invoices has arrived
    if (prevProps.invoices !== this.props.invoices) {
      this.props.getDebtsPerCompany(
        this.props.company.companyId,
        this.state.initialStartDate,
        this.state.initialEndDate
      );
    }

    //check if debts have arrived
    if (prevProps.debts !== this.props.debts) {
      this.handleProps(this.props);
    }

    //check if stocks have arrived
    //if (prevProps.stocks !== this.props.stocks) {
    //this.handleProps(this.props);
    //}

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
      this.props.getSalesPerCompany(
        this.props.company.companyId,
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
      this.props.getSalesPerCompany(
        this.props.company.companyId,

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
    this.props.getSalesPerCompany(
      this.props.company.companyId,

      this.state.initialStartDate,
      this.state.initialEndDate
    );

    this.setState({
      loading: "block",
    });
  }

  workDate(date) {
    let firstDate = date;
    let lastDate = new Date(date.getFullYear(), 11, 31);

    this.setState({
      initialStartDate: firstDate,
      initialEndDate: lastDate,
      startDate: firstDate,
      endDate: lastDate,
    });
  }

  render() {
    const tableStyle = {
      backgroundColor: "#fff",
      maxHeight: "300px",
    };
    return (
      <Fragment>
        <div className="row justify-content-center mb-4">
          <SingleDatePicker
            fxn={this.workDate.bind(this)}
            style={{ textAlign: "center" }}
          />
        </div>
        <div className="row mb-2 pr-3">
          <div className="col-lg-3 mb-4 pl-3 pr-3">
            <div className="showBox">
              <div className="showChild showTop">
                <i
                  className="fa fa-calculator"
                  aria-hidden="true"
                  id="saleVol"
                ></i>
                <span id="span1">{Formatter.format(this.state.total)}</span>
              </div>
              <div className="showChild">
                <div className="showDown">Total Sales</div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 mb-4 pl-3 pr-3">
            <div className="showBox">
              <div className="showChild showTop">
                <i className="fa fa-money" aria-hidden="true" id="incVol"></i>
                <span id="span4">{Formatter.format(this.state.balance)}</span>
              </div>
              <div className="showChild">
                <div className="showDown">Total Cash</div>
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
                <span id="span2">{Formatter.format(this.state.debtSum)}</span>
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
                <span id="span3">
                  {Formatter.format(this.state.expenseSum)}
                </span>
              </div>
              <div className="showChild">
                <div className="showDown">Expenses</div>
              </div>
            </div>
          </div>
        </div>

        {/** row for charts */}
        <div className="row pr-3 pl-2">
          <div className="col-lg-6  pl-2 pr-3 mb-3 ">
            <div className="p-3  showBox " style={{ height: "350px" }}>
              <BarChart data={this.state.monthlySales} />
            </div>
          </div>
          <div className="col-lg-6  pl-2 pr-3 mb-3 ">
            <div className="p-3 showBox" style={{ height: "350px" }}>
              <LineChart data={this.state.monthlyAnalysis} />
            </div>
          </div>
        </div>

        {/** row for trables for products and branches */}
        <div className="row pr-3 pl-2">
          <div className="col-lg-6  pl-2 pr-3 mb-3 ">
            <div className="p-3 showBox table-responsive" style={tableStyle}>
              <h6 className="border border-top-0 border-right-0 border-left-0">
                Top Products
              </h6>
              <table className="table table-sm table-striped table-borderless">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Rate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Paracetmol</td>
                    <td>12.00%</td>
                  </tr>
                  <tr>
                    <td>Abidec</td>
                    <td>11.00%</td>
                  </tr>
                  <tr>
                    <td>Sensodyn</td>
                    <td>10.00%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-lg-6  pl-2 pr-3 mb-3 ">
            <div className="p-3 showBox table-responsive" style={tableStyle}>
              <h6 className="border border-top-0 border-right-0 border-left-0">
                Top branches
              </h6>
              <table className="table table-sm table-striped table-borderless">
                <thead>
                  <tr>
                    <th>Branch</th>
                    <th>Rate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Br1233</td>
                    <td>12.00%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/** row for charts */}
        {/*
       <div className="row mt-3 pr-4 pl-3 " >
        <div className="showBox">
          <div className="p-3 chart " >
            <BarChart data={this.state.monthlySales} />
          </div>
        </div>
        </div>
        */}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  stocks: state.stocks.items,
  sales: state.sales.items,
  clearance: state.clearance.items,
  expenses: state.expenses.items,
  debts: state.debts.items,
  branch: state.branches.item,
  branches: state.branches.items,
  company: state.companies.item,
  invoices: state.invoices.items,
});

export default connect(mapStateToProps, {
  getSalesPerCompany,
  getStocks,
  getClearancePerCompany,
  getExpensesPerCompany,
  getDebtsPerCompany,
  getInvoicesPerCompany,
})(DashboardPage);
