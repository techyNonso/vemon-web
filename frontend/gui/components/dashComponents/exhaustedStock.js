import React, { Component, Fragment } from "react";
import { getStocks } from "Store/actions/stockAction";
import Pagination from "Components/dashComponents/pagination";
import { getCompanies } from "Store/actions/companyAction";
import propTypes from "prop-types";
import { connect } from "react-redux";
import {
  extractProductId,
  getStockArray,
  getLowStock,
  getSearchResult,
} from "Modules/stock";

class ExhaustedStock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      componentStocks: [],
      originalLowStock: [],
      lowStock: [],
      loading: false,
      currentPage: 1,
      postsPerPage: 1,
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
        this.state.originalLowStock,
        event.target.value
      );

      if (list.length > 0) {
        this.setState({
          lowStock: list,
          loading: false,
        });
      } else {
        //set list back to original list
        this.setState({
          lowStock: [],
          loading: false,
        });
      }
    } else {
      //if search box is empty
      this.setState({
        lowStock: this.state.originalLowStock,
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
    let lowStock = getLowStock(stocks);

    //set state with new stocks state set
    this.setState({
      componentStocks: stocks,
      originalLowStock: lowStock,
      loading: false,
      lowStock: lowStock,
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
    const currentPosts = this.state.lowStock.slice(
      indexOfFirstPost,
      indexOfLastPost
    );

    let lowStockList;
    //check list
    if (currentPosts.length > 0) {
      lowStockList = currentPosts.map((stock) => (
        <tr key={stock.id}>
          <td>{stock.id}</td>
          <td>{stock.name}</td>
          <td>{stock.qty}</td>
        </tr>
      ));
    } else {
      lowStockList = (
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
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {loading}
              {lowStockList}
            </tbody>
          </table>
        </div>

        <Pagination
          postsPerPage={this.state.postsPerPage}
          totalPosts={this.state.lowStock.length}
          paginate={paginate}
        />
      </Fragment>
    );
  }
}

ExhaustedStock.propTypes = {
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
})(ExhaustedStock);
