import React, { Component, Fragment } from "react";
import { getStocks } from "Store/actions/stockAction";
import Pagination from "Components/dashComponents/pagination";
import { getCompanies } from "Store/actions/companyAction";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { toast } from "react-toastify";
//loading imports
import { css } from "@emotion/core";
import { BeatLoader } from "react-spinners";
//alert
import SweetAlert from "sweetalert2-react";
import swal from "sweetalert";

import {
  extractProductId,
  getStockArray,
  getTotalQty,
  getTotalBatches,
  getSearchResult,
} from "Modules/stock";

class AllStock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      componentStocks: [],
      originalStocks: [],
      totalQuantity: "",
      totalBatches: "",
      loading: "none",
      currentPage: 1,
      postsPerPage: 100,
      searchValue: "",
      show: false,
    };

    //handle props received
    this.handleProps = this.handleProps.bind(this);
    this.showLoading = this.showLoading.bind(this);
    this.hideLoading = this.hideLoading.bind(this);
  }

  //search item in list starting from first page
  searchList(event) {
    this.setState({
      searchValue: event.target.value,
      currentPage: 1,
      loading: "block",
    });

    //check if there if value to be searched
    if (event.target.value.trim().length > 0) {
      //check if any result was received
      let list = getSearchResult(this.state.originalStocks, event.target.value);

      if (list.length > 0) {
        this.setState({
          componentStocks: list,
          loading: "none",
        });
      } else {
        //set list back to original list
        this.setState({
          componentStocks: [],
          loading: "none",
        });
      }
    } else {
      //if search box is empty
      this.setState({
        componentStocks: this.state.originalStocks,
        loading: "none",
      });
    }
  }

  checkStatus(date) {
    let oldDate = new Date(date);
    let now = new Date();
    now.setHours(0, 0, 0, 0);

    if (oldDate < now) {
      return true;
    } else {
      return false;
    }
  }

  showLoading() {
    this.setState({
      loading: "block",
    });
  }

  hideLoading() {
    this.setState({
      loading: "none",
    });
  }

  //wait for when our props arrive
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.stocks !== this.props.stocks) {
      this.handleProps(this.props);
    }

    if (
      prevProps.company !== this.props.company ||
      prevProps.branch !== this.props.branch
    ) {
      //console.log(this.props.company.companyId, this.props.branch.branchId);
      if (this.checkStatus(this.props.company.expiryDate)) {
        swal({
          title: "Data error",
          text: `You need to clear all bills associated with ${this.props.company.companyId} before you can access this data.`,
          icon: "error",
          button: "OK",
        });

        return;
      }
      this.setState({
        loading: "block",
      });
      this.props.getStocks(
        this.props.company.companyId,
        this.props.branch.branchId
      );
    }
  }

  //format the data into a displayable
  handleProps(props) {
    let ids = extractProductId(props.stocks);

    let stocks = getStockArray(ids, props.stocks);
    let totalQty = getTotalQty(props.stocks);
    let totalBatches = getTotalBatches(props.stocks);

    //set state with new stocks state set
    this.setState({
      componentStocks: stocks,
      originalStocks: stocks,
      totalQuantity: totalQty,
      totalBatches: totalBatches,
      loading: "none",
    });
  }

  componentDidMount() {
    //console.log(this.props.company.companyId, this.props.branch.branchId);
    if (this.checkStatus(this.props.company.expiryDate)) {
      swal({
        title: "Data error",
        text: `You need to clear all bills associated with ${this.props.company.companyId} before you can access this data.`,
        icon: "error",
        button: "OK",
      });

      return;
    }
    this.props.getStocks(
      this.props.company.companyId,
      this.props.branch.branchId
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
    const currentPosts = this.state.componentStocks.slice(
      indexOfFirstPost,
      indexOfLastPost
    );

    //change the page
    const paginate = (pageNumber) => this.setState({ currentPage: pageNumber });
    let stockList;
    //check list
    if (currentPosts.length > 0) {
      stockList = currentPosts.map((stock) => (
        <tr key={stock.id}>
          <td>{stock.id}</td>
          <td>{stock.name}</td>
          <td>{stock.qty}</td>
          <td>{stock.batches}</td>
          <td>{stock.bought}</td>
          <td>{stock.sold}</td>
        </tr>
      ));
    } else {
      stockList = (
        <tr>
          <td>No record found</td>
        </tr>
      );
    }
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
            <tbody>{stockList}</tbody>
            <tfoot>
              <tr>
                <th>Total</th>
                <th></th>
                <th>{this.state.totalQuantity}</th>
                <th>{this.state.totalBatches}</th>
                <th></th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>
        <Pagination
          postsPerPage={this.state.postsPerPage}
          totalPosts={this.state.componentStocks.length}
          paginate={paginate}
        />
      </Fragment>
    );
  }
}

AllStock.propTypes = {
  getStocks: propTypes.func.isRequired,

  stocks: propTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  stocks: state.stocks.items,
  branch: state.branches.item,
  company: state.companies.item,
});

export default connect(mapStateToProps, {
  getStocks,
})(AllStock);
