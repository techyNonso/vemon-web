import React, { Component } from "react";

class StockActivities extends Component {
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
                <th>Date</th>
                <th>Staff Id</th>
                <th>Staff Name</th>
                <th>Activity</th>

                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>02-12-2020</td>
                <td>930949</td>
                <td>Ikeji Johnson</td>
                <td>Quantity Change</td>

                <td>
                  <button className="btn btn-secondary btn-sm">Detail</button>
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

export default StockActivities;
