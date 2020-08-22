import React, { Component } from "react";

class Companies extends Component {
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
                <th>Company Id</th>
                <th>Company Name</th>
                <th>Plan</th>
                <th>Branches</th>
                <th colSpan="2">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>093033</td>
                <td>Ad williams Pharmaceuticals</td>
                <td>Premium Pro </td>
                <td>5</td>
                <td>
                  <button className="btn btn-sm btn-primary">Edit</button>
                </td>

                <td>
                  <button className="btn btn-sm btn-danger">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="row mt-4">
          <div className="col text-center">
            <button className="btn btn-success">Add Company</button>
          </div>
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

export default Companies;
