import React, { Component, Fragment } from "react";
import DateRangeSelect from "Components/dashComponents/dateRangeSelect";
import propTypes from "prop-types";
import { connect } from "react-redux";
import Pagination from "Components/dashComponents/pagination";
import { getSales } from "Store/actions/salesAction";
import Formatter from "Components/dashComponents/Formatter";

import {
  extractDates,
  extractSales,
  getSaleSearchResult,
  extractTypeSales,
  getOthers,
} from "Modules/sales";

//loading imports
import { css } from "@emotion/core";
import { BeatLoader } from "react-spinners";
import swal from "sweetalert";

class CreditSales extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      initialStartDate: new Date(),
      initialEndDate: new Date(),
      loading: "none",
      sales: [],
      originalSales: [],
      postsPerPage: 1,
      currentPage: 1,
      searchValue: "",
      totalSales: "",
      cashSales: "",
      onlineSales: "",
      creditSales: "",
      discount: "",
      balance: "",
    };
    //handle props received
    this.handleProps = this.handleProps.bind(this);
    this.handleDate = this.handleDate.bind(this);
  }

  handleDate(data) {
    this.setState({
      startDate: data.startDate,
      endDate: data.endDate,
    });

    if (data.startDate == null && data.endDate == null) {
      this.setState({
        startDate: new Date(),
        endDate: new Date(),
      });
    } else if (data.startDate == null && data.endDate !== null) {
      this.setState({
        initialStartDate: data.endDate,
        initialEndDate: data.endDate,
      });
    } else if (data.startDate !== null && data.endDate == null) {
      this.setState({
        initialStartDate: data.startDate,
        initialEndDate: data.startDate,
      });
    } else if (data.startDate !== null && data.endDate !== null) {
      this.setState({
        initialStartDate: data.startDate,
        initialEndDate: data.endDate,
      });
    }
  }

  //format the data into a displayable
  handleProps(props) {
    //check if both dates are not null
    let startDate = this.state.startDate;
    if (startDate == null) {
      startDate = this.state.initialStartDate;
    }
    let endDate = this.state.endDate;
    if (startDate !== null && endDate !== null) {
      let mainSales = props.sales;
      let mainTypeSales = extractTypeSales(mainSales, "credit");

      //get others
      let [total, cashs, onlines, credits, discount, balance] = getOthers(
        mainTypeSales
      );

      //set state of activities
      this.setState({
        sales: mainTypeSales,
        originalSales: mainTypeSales,
        loading: "none",
        balance: balance,
        totalSales: total,
        cashSales: cashs,
        creditSales: credits,
        onlineSales: onlines,
        discount: discount,
      });
    }
  }

  //search starting from first page
  searchList(event) {
    this.setState({
      searchValue: event.target.value,
      currentPage: 1,
      loading: "block",
    });

    //check if there if value to be searched
    if (event.target.value.trim().length > 0) {
      //check if any result was received
      let list = getSaleSearchResult(
        this.state.originalSales,
        event.target.value
      );

      if (list.length > 0) {
        this.setState({
          sales: list,
          loading: "none",
        });
      } else {
        //set list back to original list
        this.setState({
          sales: [],
          loading: "none",
        });
      }
    } else {
      //if search box is empty
      this.setState({
        sales: this.state.originalSales,
        loading: "none",
      });
    }
  }

  checkDateStatus(date) {
    let oldDate = new Date(date);
    let now = new Date();
    now.setHours(0, 0, 0, 0);

    if (oldDate < now) {
      return true;
    } else {
      return false;
    }
  }

  //wait for when our props arrive
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.sales !== this.props.sales) {
      this.handleProps(this.props);
    }

    if (
      prevProps.company !== this.props.company ||
      prevProps.branch !== this.props.branch
    ) {
      //console.log(this.props.company.companyId, this.props.branch.branchId);
      if (this.checkDateStatus(this.props.company.expiryDate)) {
        swal({
          title: "Data error",
          text: `You need to clear all bills associated with ${this.props.company.companyId} before you can access this data.`,
          icon: "error",
          button: "OK",
        });

        return;
      }
      this.props.getSales(
        this.props.company.companyId,
        this.props.branch.branchId,
        this.state.initialStartDate,
        this.state.initialEndDate
      );

      this.setState({
        loading: "block",
      });
    }

    //check for date change
    if (
      prevState.startDate !== this.state.startDate ||
      prevState.endDate !== this.state.endDate
    ) {
      if (this.checkDateStatus(this.props.company.expiryDate)) {
        swal({
          title: "Data error",
          text: `You need to clear all bills associated with ${this.props.company.companyId} before you can access this data.`,
          icon: "error",
          button: "OK",
        });

        return;
      }
      this.props.getSales(
        this.props.company.companyId,
        this.props.branch.branchId,
        this.state.initialStartDate,
        this.state.initialEndDate
      );

      this.setState({
        loading: "block",
      });
    }
  }

  componentDidMount() {
    if (this.checkDateStatus(this.props.company.expiryDate)) {
      swal({
        title: "Data error",
        text: `You need to clear all bills associated with ${this.props.company.companyId} before you can access this data.`,
        icon: "error",
        button: "OK",
      });

      return;
    }
    this.props.getSales(
      this.props.company.companyId,
      this.props.branch.branchId,
      this.state.initialStartDate,
      this.state.initialEndDate
    );
    this.setState({
      loading: "block",
    });
  }

  render() {
    const loaderStyle = {
      width: "200px",
      position: "fixed",
      zIndex: "1000",
      left: "50%",
      marginLeft: "-100px",
      display: this.state.loading,
    };

    //get current stocks
    const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
    const currentPosts = this.state.sales.slice(
      indexOfFirstPost,
      indexOfLastPost
    );

    let salesList;
    //check list
    if (currentPosts.length > 0) {
      salesList = currentPosts.map((sale) => (
        <tr key={sale.id}>
          <td>{sale.date}</td>
          <td>{sale.productId}</td>
          <td>{sale.productName}</td>
          <td>{sale.quantity}</td>
          <td>{sale.price}</td>
        </tr>
      ));
    } else {
      salesList = (
        <tr>
          <td>No record found</td>
        </tr>
      );
    }

    //change the page
    const paginate = (pageNumber) => this.setState({ currentPage: pageNumber });

    return (
      <Fragment>
        <div className="row pr-4 mb-3">
          <div className="text-center  " style={loaderStyle}>
            <BeatLoader size={15} color="green" loading />
          </div>
        </div>
        <div className="row mt-3 pl-3 pr-3">
          <div className="col-md-6 pb-2">
            <span>
              <strong>Branches</strong> : 1 of {this.props.branches.length}
            </span>
          </div>

          <div className="col-md-6 pb-2">
            <form action="" className="form">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Search"
                  className="form-control"
                  value={this.state.searchValue}
                  onChange={this.searchList.bind(this)}
                />
              </div>
            </form>
          </div>
        </div>

        <div className="row text-center justify-content-center">Sort Date</div>
        <div
          className="row justify-content-center pb-4 "
          style={{ zIndex: "100", position: "relative" }}
        >
          <DateRangeSelect parentFunc={this.handleDate} />
        </div>
        <div className="row table-responsive boxUp p-3">
          <table className="table table-sm table-striped table-borderless">
            <thead>
              <tr>
                <th>Date</th>
                <th>Product Id</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>{salesList}</tbody>
          </table>
        </div>

        <Pagination
          postsPerPage={this.state.postsPerPage}
          totalPosts={this.state.sales.length}
          paginate={paginate}
        />

        <div className="row table-responsive boxUp p-3 mt-4">
          <table className="table table-sm table-striped table-borderless">
            <thead>
              <tr>
                <th>Total</th>

                {/**<th>Disccount</th>
                <th>Balance</th>**/}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{Formatter.format(this.state.creditSales)}</td>

                {/**<td>{this.state.discount} %</td>
                <td>{Formatter.format(this.state.balance)}</td>**/}
              </tr>
            </tbody>
          </table>
        </div>
      </Fragment>
    );
  }
}

CreditSales.propTypes = {
  getSales: propTypes.func.isRequired,
  sales: propTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  sales: state.sales.items,
  branch: state.branches.item,
  company: state.companies.item,
});

export default connect(mapStateToProps, { getSales })(CreditSales);
