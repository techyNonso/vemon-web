import React, { Component } from "react";

class Attendance extends Component {
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
                <th>Staff Id</th>
                <th>Staff Name</th>
                <th>Arrival Time</th>
                <th>Exit Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>STF109</td>
                <td>Ikeji William</td>
                <td>8:00am</td>
                <td>12:00pm</td>
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

export default Attendance;
