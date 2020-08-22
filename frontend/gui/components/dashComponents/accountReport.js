import React, { Component } from "react";

class AccountReport extends Component {
  constructor(props) {
    super(props);
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

export default AccountReport;
