import React, { Component } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
//import { getBranches } from "Store/actions/branchAction";

class Branches extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getBranches();
    console.log(this.props.branches);
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

Branches.propTypes = {
  //getBranches: propTypes.func.isRequired,
  branches: propTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  branches: state.branches.items,
});

export default connect(mapStateToProps, null)(Branches);
