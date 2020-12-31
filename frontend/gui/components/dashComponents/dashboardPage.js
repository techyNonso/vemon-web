import React, { Component,Fragment } from "react";

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

  render() {
    const tableStyle={
      "backgroundColor":"#fff",
      "max-height":"300px"
    }
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
              <thead >
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
        
      </Fragment>
      )
  }
}

export default DashboardPage;
