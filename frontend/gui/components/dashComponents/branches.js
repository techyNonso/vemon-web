import React, { Component } from "react";

class Branches extends Component {
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
                <th>Branch Id</th>
                <th>State</th>
                <th>Town</th>
                <th>Street</th>
                <th>Phone</th>

                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Br109</td>
                <td>Anambra</td>
                <td>Onitsha</td>
                <td>9 umunya street</td>
                <td>0813832011</td>

                <td>
                  <button className="btn btn-sm btn-danger">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="row mt-4">
          <div className="col text-center">
            <button className="btn btn-success">Add Branch</button>
          </div>
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

export default Branches;
