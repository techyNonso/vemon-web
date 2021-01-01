import React, { Component,Fragment } from "react";
import { connect } from "react-redux";
import { getSalesPerCompany } from "Store/actions/salesAction";
import { getStocks } from "Store/actions/stockAction";
import { getClearancePerCompany } from "Store/actions/clearanceAction";
import { getExpensesPerCompany } from "Store/actions/expenseAction";
import { getDebtsPerCompany } from "Store/actions/debtsAction";
import LineChart from 'Components/dashComponents/Charts/lineChart'
import BarChart from 'Components/dashComponents/Charts/barChart'
import MyCalendar from 'Components/dashComponents/Charts/calendar'


import { extractDates } from "Modules/sales";
import { extractDebts } from "Modules/debts";
import { extractClearance } from "Modules/clearance";
import {
  getTotalSalesDetails,
  getDebtDetails,
  getExpenseSum,
  getClearanceDetails,
  generateReport,
  extractSales,
} from "Modules/account";
import { extractProductId, getStockArray } from "Modules/stock";

import { extractExpenses } from "Modules/expenses";


//loading imports
import {css} from '@emotion/core'
import {BeatLoader} from 'react-spinners'
import SingleDatePicker from "./singleDatePicker";


class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      initialStartDate: new Date(),
      initialEndDate: new Date(),
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
    };

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
      this.props.getDebtsPerCompany(
        this.props.company.companyId,
        this.state.initialStartDate,
        this.state.initialEndDate
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
     // this.handleProps(this.props);
    }

    if (
      prevProps.company !== this.props.company ||
      prevProps.branch !== this.props.branch
    ) {
      //console.log(this.props.company.companyId, this.props.branch.branchId);
      
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
    this.props.getSalesPerCompany(
      this.props.company.companyId,
    
      this.state.initialStartDate,
      this.state.initialEndDate
    );

    this.setState({
      loading: "block",
    });
  }


  render() {
    const tableStyle={
      "backgroundColor":"#fff",
      "maxHeight":"300px"
    }
    return (
      <Fragment>

        <div className="row justify-content-center mb-4">
          <SingleDatePicker style={{"textAlign":"center"}}/>
          

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
                <span id="span1">{this.state.total}</span>
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
                <span id="span4">{this.state.paidSum}</span>
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

        {/** row for trables for products and branches */}
        <div className="row pr-3 pl-2" >
          <div className="col-md-6  pl-2 pr-3 mb-3 " >
            <div className="p-3 showBox table-responsive" style={tableStyle}>
            <h6 className="border border-top-0 border-right-0 border-left-0">Top Products</h6>
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
          <div className="col-md-6  pl-2 pr-3 mb-3 " >
          <div className="p-3 showBox table-responsive" style={tableStyle}>
          <h6 className="border border-top-0 border-right-0 border-left-0">Top branches</h6>
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
       <div className="row pr-3 pl-2" >
          <div className="col-md-8  pl-2 pr-3 mb-3 " >
            <div className="p-3 showBox" >
            <div className="chart">
              <LineChart/>
            </div>
            </div>
          </div>
          <div className="col-md-4  pl-2 pr-3 mb-3 " >
          <div className="p-3  showBox " >
            <MyCalendar />
            </div>
        </div>
        </div>

        {/** row for charts */}
       <div className="row mt-3 pr-4 pl-3 " >
        <div className="showBox">
          <div className="p-3 chart " >
            <BarChart />
          </div>
        </div>
        </div>
        
        
      </Fragment>
      )
  }
}


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
  getSalesPerCompany,
  getStocks,
  getClearancePerCompany,
  getExpensesPerCompany,
  getDebtsPerCompany,
})(DashboardPage);
