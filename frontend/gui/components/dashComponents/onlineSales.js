import React, { Component } from "react";

class AllSales extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
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
                <th>Product Id</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>093033</td>
                <td>Paracetamol</td>
                <td>10</td>
                <td>5</td>
              </tr>
            </tbody>
          </table>
        </div>

        <ul className="pagination justify-content-end pr-3 pt-4">
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

        <div className="row table-responsive boxUp p-3 mt-4">
          <table className="table table-sm table-striped table-borderless">
            <thead>
              <tr>
                <th>Total</th>

                <th>Disccount</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>102,000</td>

                <td>10 %</td>
                <td>100</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default AllSales;
