import React, { Component } from "react";

class AllStock extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="row table-responsive boxUp p-3">
          <table className="table table-sm table-striped table-borderless">
            <thead>
              <tr>
                <th>Product Id</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Batches</th>
                <th>Bought</th>
                <th>Sold</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>093033</td>
                <td>Paracetamol</td>
                <td>10</td>
                <td>5</td>
                <td>1000</td>
                <td>1500</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th>Total</th>
                <th>200</th>
                <th>1000</th>
                <th>90</th>
                <th></th>
                <th></th>
              </tr>
            </tfoot>
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

export default AllStock;
