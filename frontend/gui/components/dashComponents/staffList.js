import React, { Component } from "react";

class StaffList extends Component {
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
                <th>Id</th>
                <th>Name</th>
                <th>Position</th>
                <th>Email</th>

                <th>Phone</th>
                <th>Address</th>
                <th>Permission</th>
                <th>Registered</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>STF109</td>
                <td>Ikeji William</td>
                <td>Accountant</td>
                <td>Williamikeji@gmail.com</td>
                <td>08131832011</td>
                <td>9 umunya street</td>
                <td>Admin</td>
                <td>23-12-2020</td>

                <td>
                  <button className="btn btn-sm btn-danger">Block</button>
                </td>
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
      </div>
    );
  }
}

export default StaffList;
