import React, { Component, Fragment } from "react";
import { getStocks } from "Store/actions/stockAction";
import Pagination from "Components/dashComponents/pagination";
import { getCompanies } from "Store/actions/companyAction";
import propTypes from "prop-types";
import { connect } from "react-redux";
import {
  extractProductId,
  getStockArray,
  getExpiredStock,
  getSearchResult,
} from "Modules/stock";

class ExpiredStock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      componentStocks: [],
      originalExpiredStock: [],
      expiredStock: [],
      loading: false,
      currentPage: 1,
      postsPerPage: 100,
      searchValue: "",
    };

    //handle props received
    this.handleProps = this.handleProps.bind(this);
  }

  //search starting from first page
  searchList(event) {
    this.setState({
      searchValue: event.target.value,
      currentPage: 1,
      loading: true,
    });

    //check if there if value to be searched
    if (event.target.value.trim().length > 0) {
      //check if any result was received
      let list = getSearchResult(
        this.state.originalExpiredStock,
        event.target.value
      );

      if (list.length > 0) {
        this.setState({
          expiredStock: list,
          loading: false,
        });
      } else {
        //set list back to original list
        this.setState({
          expiredStock: [],
          loading: false,
        });
      }
    } else {
      //if search box is empty
      this.setState({
        expiredStock: this.state.originalExpiredStock,
        loading: false,
      });
    }
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
      this.setState({
        loading: true,
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
    let rawStock = props.stocks;
    let expiredStock = getExpiredStock(rawStock, 90);

    //set state with new stocks state set
    this.setState({
      componentStocks: stocks,
      originalExpiredStock: expiredStock,
      loading: false,
      expiredStock: expiredStock,
    });
  }

  componentDidMount() {
    //console.log(this.props.company.companyId, this.props.branch.branchId);
    this.props.getStocks(
      this.props.company.companyId,
      this.props.branch.branchId
    );
    this.setState({
      loading: true,
    });
  }

  render() {
    let loading;
    if (this.state.loading) {
      loading = (
        <tr>
          <td>please wait...</td>
        </tr>
      );
    }

    //get current stocks
    const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
    const currentPosts = this.state.expiredStock.slice(
      indexOfFirstPost,
      indexOfLastPost
    );

    let expiredStockList;
    //check list
    if (currentPosts.length > 0) {
      expiredStockList = currentPosts.map((stock) => (
        <tr key={stock.rowId}>
          <td>{stock.id}</td>
          <td>{stock.name}</td>
          <td>{stock.batchId}</td>
          <td>{stock.qty}</td>
          <td>{stock.life}</td>
          <td>{stock.date}</td>
        </tr>
      ));
    } else {
      expiredStockList = (
        <tr>
          <td>No record found</td>
        </tr>
      );
    }

    //change the page
    const paginate = (pageNumber) => this.setState({ currentPage: pageNumber });
    return (
      <Fragment>
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
                <th>Batch Id</th>
                <th>Quantity</th>
                <th>Time Remaining</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {loading}
              {expiredStockList}
            </tbody>
          </table>
        </div>

        <Pagination
          postsPerPage={this.state.postsPerPage}
          totalPosts={this.state.expiredStock.length}
          paginate={paginate}
        />
      </Fragment>
    );
  }
}

ExpiredStock.propTypes = {
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
})(ExpiredStock);
