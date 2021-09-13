import React, { Component, Fragment, useState } from "react";
import DateRangeSelect from "Components/dashComponents/dateRangeSelect";
import propTypes from "prop-types";
import { connect } from "react-redux";
import Pagination from "Components/dashComponents/pagination";
import { getSales, getPrevSales } from "Store/actions/salesAction";
import { getInvoices, getPrevInvoices } from "Store/actions/invoicesAction";
import { getStocks } from "Store/actions/stockAction";
import { getClearance } from "Store/actions/clearanceAction";
import { getExpenses } from "Store/actions/expenseAction";
import { getDebts } from "Store/actions/debtsAction";
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
} from "Modules/account";
import { extractProductId, getStockArray } from "Modules/stock";

import { extractExpenses } from "Modules/expenses";
import swal from "sweetalert";
//import bootstrap component
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";

//loading imports
import { css } from "@emotion/core";
import { BeatLoader } from "react-spinners";

class AccountReport extends Component {
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

    //handle props received
    this.handleProps = this.handleProps.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.ifNegative = this.ifNegative.bind(this);
    this.ifPositive = this.ifPositive.bind(this);
  }

  //work with date sent in
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
      let ids = extractProductId(props.stocks);

      let stocks = getStockArray(ids, props.stocks);
      let mainDebts = props.debts;
      let mainExpenses = props.expenses;
      let mainSales = props.sales;
      let mainClearance = props.clearance;
      let mainInvoices = props.invoices;
      let [total, paidSum] = getTotalInvoicesDetails(mainInvoices);
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
        mainInvoices,
        mainClearance,
        stocks,
        this.props.prevInvoices,
        this.props.prevSales
      );

      //set state of activities
      this.setState({
        total: total,
        paidSum: paidSum,
        debtSum: debtSum,
        expenseSum: expenseSum,
        debtPaid: clearanceSum,
        balance,
        loading: "none",
        report,
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
      this.props.getPrevSales(
        this.props.company.companyId,
        this.props.branch.branchId,
        this.state.initialStartDate,
        this.state.initialEndDate
      );
    }

    //now check if previous sales have arrived
    if (prevProps.prevSales !== this.props.prevSales) {
      this.props.getExpenses(
        this.props.company.companyId,
        this.props.branch.branchId,
        this.state.initialStartDate,
        this.state.initialEndDate
      );
    }

    //check if expenses have arrived
    if (prevProps.expenses !== this.props.expenses) {
      this.props.getClearance(
        this.props.company.companyId,
        this.props.branch.branchId,
        this.state.initialStartDate,
        this.state.initialEndDate
      );
    }

    //check if clearance have arrived
    if (prevProps.clearance !== this.props.clearance) {
      this.props.getPrevInvoices(
        this.props.company.companyId,
        this.props.branch.branchId,
        this.state.initialStartDate,
        this.state.initialEndDate
      );
    }

    //check if previous invoices have arrived
    if (prevProps.prevInvoices !== this.props.prevInvoices) {
      this.props.getInvoices(
        this.props.company.companyId,
        this.props.branch.branchId,
        this.state.initialStartDate,
        this.state.initialEndDate
      );
    }

    //check if invoices have arrived
    if (prevProps.invoices !== this.props.invoices) {
      this.props.getDebts(
        this.props.company.companyId,
        this.props.branch.branchId,
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
      this.props.getSales(
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
      this.props.getSales(
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
    this.props.getSales(
      this.props.company.companyId,
      this.props.branch.branchId,
      this.state.initialStartDate,
      this.state.initialEndDate
    );

    this.setState({
      loading: "block",
    });
  }

  ifNegative(gainPercent) {
    return Number(gainPercent) < 0 ? true : false;
  }

  ifPositive(gainPercent) {
    return Number(gainPercent) >= 0 ? true : false;
  }

  //change modal state to false
  hideDisplay() {
    this.setState({
      displayModal: false,
      //deleteClick: false,
    });
  }

  //show summary modal
  showSummary(event) {
    let btn = event.target.dataset;

    this.setState({
      displayModal: true,
      lastDate: btn.lastdate,
      lastSale: btn.lastsale,
      lastCost: btn.lastcost,
      lastGain: btn.lastgain,
      currentGain: btn.currentgain,
      currentCost: btn.currentcost,
      currentSale: btn.currentsale,
      currentDate: btn.currentdate,
      percentDiff: btn.percentdiff,
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
            <td style={{ color: "green" }}>+{report.gainPercent} %</td>
          )}
          <td>
            <button
              className="btn btn-sm btn-primary"
              data-lastdate={report.lastDate}
              data-lastsale={report.lastSale}
              data-lastcost={report.lastCost}
              data-lastgain={report.lastGain}
              data-currentdate={report.currentDate}
              data-currentsale={report.currentSale}
              data-currentcost={report.currentCost}
              data-currentgain={report.currentGain}
              data-percentdiff={report.gainPercent}
              onClick={this.showSummary.bind(this)}
            >
              Detail
            </button>
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
    //work with modal
    let modal = null;
    if (this.state.displayModal) {
      modal = (
        <ActMod
          modState={this.hideDisplay.bind(this)}
          lastDate={this.state.lastDate}
          lastSale={this.state.lastSale}
          lastCost={this.state.lastCost}
          lastGain={this.state.lastGain}
          currentDate={this.state.currentDate}
          currentSale={this.state.currentSale}
          currentCost={this.state.currentCost}
          currentGain={this.state.currentGain}
          percentDiff={this.state.percentDiff}
        />
      );
    }
    return (
      <Fragment>
        {modal}
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
        </div>

        <div className="row text-center justify-content-center">Sort Date</div>
        <div
          className="row justify-content-center pb-4 "
          style={{ zIndex: "100", position: "relative" }}
        >
          <DateRangeSelect parentFunc={this.handleDate} />
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
                <div className="showDown">Total Amount</div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 mb-4 pl-3 pr-3">
            <div className="showBox">
              <div className="showChild showTop">
                <i className="fa fa-money" aria-hidden="true" id="incVol"></i>
                <span id="span4">{Formatter.format(this.state.paidSum)}</span>
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

        <div className="row mb-2 pr-3">
          <div className="col-lg-6 mb-4 pl-3 pr-3">
            <div className="showBox">
              <div className="showChild showTop">
                <i
                  className="fa fa-info-circle"
                  aria-hidden="true"
                  id="invVol"
                ></i>
                <span id="span6">{Formatter.format(this.state.debtPaid)}</span>
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
                <span id="span5">{Formatter.format(this.state.balance)}</span>
              </div>
              <div className="showChild">
                <div className="showDown">Balance</div>
              </div>
            </div>
          </div>
        </div>

        <div className="row table-responsive boxUp p-3">
          <table className="table table-sm table-striped table-borderless">
            <thead>
              <tr>
                <th>Date</th>
                <th>Total(+discounts)</th>
                <th>Amount Paid</th>
                <th>Debt Paid</th>
                <th>Debt To Pay</th>
                <th>Expenses</th>
                <th>Balance</th>
                <th>Outcome</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{reportList}</tbody>
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
  invoices: state.invoices.items,
  prevInvoices: state.invoices.prevItems,
  prevSales: state.sales.prevItems,
});

export default connect(mapStateToProps, {
  getSales,
  getStocks,
  getClearance,
  getExpenses,
  getDebts,
  getInvoices,
  getPrevInvoices,
  getPrevSales,
})(AccountReport);

//write modal for this app
const ActMod = (props) => {
  const [isOpen, setIsOpen] = useState(true);

  const showModal = () => {
    setIsOpen(false);
  };

  const hideModal = () => {
    setIsOpen(false);
    props.modState();
  };

  const ifNegative = (gainPercent) => {
    return Number(gainPercent) < 0 ? true : false;
  };

  const ifPositive = (gainPercent) => {
    return Number(gainPercent) >= 0 ? true : false;
  };

  return (
    <Modal show={isOpen} onHide={hideModal}>
      <ModalHeader>
        <ModalTitle>Summary For {props.currentDate}</ModalTitle>
      </ModalHeader>

      <ModalBody>
        <div className="table-responsive">
          <table className="table ">
            <thead>
              <tr>
                <th>Date</th>
                <th>Sales</th>
                <th>Cost</th>
                <th>Gain</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{props.lastDate}</td>
                <td>{props.lastSale}</td>
                <td>{props.lastCost}</td>
                <td>{props.lastGain}</td>
              </tr>
              <tr>
                <td>{props.currentDate}</td>
                <td>{props.currentSale}</td>
                <td>{props.currentCost}</td>
                <td>{props.currentGain}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th>Percentage Difference</th>
                {ifNegative(props.percentDiff) && (
                  <th style={{ color: "red" }}>{props.percentDiff} % </th>
                )}
                {ifPositive(props.percentDiff) && (
                  <th style={{ color: "green" }}>+{props.percentDiff} %</th>
                )}
                <th></th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-sm btn-primary" onClick={hideModal}>
          Done
        </button>
      </ModalFooter>
    </Modal>
  );
};
