import React, { Component, Fragment } from "react";
import { getStocks } from "Store/actions/stockAction";
import Pagination from "Components/dashComponents/pagination";
import { getCompanies } from "Store/actions/companyAction";
import propTypes from "prop-types";
import { connect } from "react-redux";
import {
  extractProductId,
  getStockArray,
  getTotalQty,
  getTotalBatches,
} from "Modules/stock";
class AllStock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      componentStocks: [],
      totalQuantity: "",
      totalBatches: "",
      loading: false,
      currentPage: 1,
      postsPerPage: 1,
    };

    this.handleProps = this.handleProps.bind(this);
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
    let totalQty = getTotalQty(props.stocks);
    let totalBatches = getTotalBatches(props.stocks);

    //set state with new stocks state set
    this.setState({
      componentStocks: stocks,
      totalQuantity: totalQty,
      totalBatches: totalBatches,
      loading: false,
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
    const currentPosts = this.state.componentStocks.slice(
      indexOfFirstPost,
      indexOfLastPost
    );

    //change the page
    const paginate = (pageNumber) => this.setState({ currentPage: pageNumber });

    return (
      <Fragment>
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
            <tbody>
              {loading}
              {currentPosts.map((stock) => (
                <tr key={stock.id}>
                  <td>{stock.id}</td>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.batches}</td>
                  <td>{stock.bought}</td>
                  <td>{stock.sold}</td>
                </tr>
              ))}
            </tbody>
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
