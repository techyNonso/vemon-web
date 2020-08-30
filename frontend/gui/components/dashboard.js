import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "./header";
import { connect } from "react-redux";
import { getCompanyBranches, getBranch } from "Store/actions/branchAction";
import { getCompanies, getCompany } from "Store/actions/companyAction";
import propTypes from "prop-types";

//import all dashboard child components
import AllSales from "Components/dashComponents/allSales";
import AccountReport from "Components/dashComponents/accountReport";
import AllStock from "Components/dashComponents/allStock";
import Attendance from "Components/dashComponents/attendance";
import Branches from "Components/dashComponents/branches";
import CashSales from "Components/dashComponents/cashSales";
import CreditSales from "Components/dashComponents/creditSales";
import Companies from "Components/dashComponents/companies";
import Debts from "Components/dashComponents/debts";
import OnlineSales from "Components/dashComponents/onlineSales";
import Expenses from "Components/dashComponents/expenses";
import StaffList from "Components/dashComponents/stafflist";
import ProductReport from "Components/dashComponents/productReport";
import ExpiredStock from "Components/dashComponents/expiredStock";
import ExhaustedStock from "Components/dashComponents/exhaustedStock";
import StockActivities from "./dashComponents/stockActivities";
import DashboardPage from "./dashComponents/dashboardPage";
import Settings from "./dashComponents/settings";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      companies: [],
      branches: [],
      selectedCompany: "",
      selectedBranch: "",
      selectedBranchId: "",
      selectedCompanyId: "",
    };
    //this.handleProps = this.handleProps.bind(this);
  }

  componentDidMount() {
    //check if we have companies and branches in store
    if (this.props.companies.length == 0) {
      this.props.getCompanies();
    } else {
      this.setState({
        companies: this.props.companies,
        selectedCompany: this.props.company,
        selectedCompanyId: this.props.company.id,
      });
    }

    //load info from persisted storage
    if (this.props.branches.length > 0) {
      this.setState({
        branches: this.props.branches,
        selectedBranch: this.props.branch,
        selectedBranchId: this.props.branch.id,
      });
    }
  }

  //handle company change
  changeCompany(event) {
    this.setState({
      selectedCompanyId: event.target.value,
    });

    this.props.getCompany(event.target.value);
  }

  //handle branch change
  changeBranch(event) {
    this.setState({
      selectedBranchId: event.target.value,
    });

    this.props.getBranch(event.target.value);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.companies !== this.props.companies) {
      this.props.getCompany(this.props.companies[0].id);

      this.setState({
        companies: this.props.companies,
        selectedCompany: this.props.company,
        selectedCompanyId: this.props.company.id,
      });
    }

    if (prevProps.company !== this.props.company) {
      //get branches for this company
      this.props.getCompanyBranches(this.props.company.companyId);
      this.setState({
        selectedCompany: this.props.company,
      });
    }

    if (prevProps.branches !== this.props.branches) {
      this.setState({
        branches: this.props.branches,
      });
      this.props.getBranch(this.props.branches[0].id);
    }

    if (prevProps.branch !== this.props.branch) {
      this.setState({
        selectedBranch: this.props.branch,
        selectedBranchId: this.props.branch.id,
      });
    }
  }

  render() {
    //get child page if specified
    let childPage =
      this.props.match.params.page !== undefined
        ? this.props.match.params.page
        : "";

    const companyOptions = this.state.companies.map((company) => (
      <option key={company.id} value={company.id}>
        {company.companyName}
      </option>
    ));

    const branchOptions = this.state.branches.map((branch) => (
      <option key={branch.id} value={branch.id}>
        {branch.branchId}
      </option>
    ));

    return (
      <div>
        <Header />

        <div className="wrapper ">
          <nav id="sidebar">
            <div className="mt-3 text-right pr-3">
              <button
                type="button"
                id="innerSidebarCollapse"
                className="btn btn-sm btn-success hide"
              >
                <span>
                  <i className="fa fa-bars"></i>
                </span>
              </button>
            </div>

            <ul className="lisst-unstyled components">
              <li className="active">
                <Link to="/dashboard">Dashboard</Link>
              </li>

              <li>
                <a
                  href="#stockSubmenu"
                  data-toggle="collapse"
                  aria-expanded="false"
                  className="dropdown-toggle"
                >
                  Stock
                </a>
                <ul className="collapse lisst-unstyled" id="stockSubmenu">
                  <li>
                    <Link to="/dashboard/allStock">All</Link>
                  </li>
                  <li>
                    <Link to="/dashboard/expiredStock">Expired</Link>
                  </li>
                  <li>
                    <Link to="/dashboard/exhaustedStock">Exhausted</Link>
                  </li>
                  <li>
                    <Link to="/dashboard/stockActivities">Activities</Link>
                  </li>
                </ul>
              </li>

              <li>
                <a
                  href="#salesSubmenu"
                  data-toggle="collapse"
                  aria-expanded="false"
                  className="dropdown-toggle"
                >
                  Sales
                </a>
                <ul className="collapse lisst-unstyled" id="salesSubmenu">
                  <li>
                    <Link to="/dashboard/allSales">All</Link>
                  </li>
                  <li>
                    <Link to="/dashboard/cashSales">Cash</Link>
                  </li>

                  <li>
                    <Link to="/dashboard/creditSales">Credit</Link>
                  </li>
                  <li>
                    <Link to="/dashboard/onlineSales">Online</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/dashboard/debts">Debts</Link>
              </li>
              <li>
                <Link to="/dashboard/expenses">Expenses</Link>
              </li>
              <li>
                <Link to="/dashboard/companies">Companies</Link>
              </li>
              <li>
                <Link to="/dashboard/branches">Branches</Link>
              </li>
              <li>
                <a
                  href="#staffSubmenu"
                  data-toggle="collapse"
                  aria-expanded="false"
                  className="dropdown-toggle"
                >
                  Staff
                </a>
                <ul className="collapse lisst-unstyled" id="staffSubmenu">
                  <li>
                    <Link to="/dashboard/staffList">List</Link>
                  </li>
                  <li>
                    <Link to="/dashboard/attendance">Attendance</Link>
                  </li>
                </ul>
              </li>

              <li>
                <a
                  href="#reportSubmenu"
                  data-toggle="collapse"
                  aria-expanded="false"
                  className="dropdown-toggle"
                >
                  Reports
                </a>
                <ul className="collapse lisst-unstyled" id="reportSubmenu">
                  <li>
                    <Link to="/dashboard/accountReport">Account</Link>
                  </li>
                  <li>
                    <Link to="/dashboard/productReport">Product</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/dashboard/settings">Settings</Link>
              </li>
            </ul>
          </nav>

          <div id="content">
            <nav className=" pl-4 pb-3">
              <div>
                <button
                  type="button"
                  id="sidebarCollapse"
                  className="btn btn-sm btn-success"
                >
                  <span>
                    <i className="fa fa-bars"></i>
                  </span>
                </button>
                <strong className="pl-2">Liscence No: A98BG09DR383</strong>
              </div>
            </nav>
            <div className="row border border-top-0 border-left-0 border-right-0 pb-3 pl-3 pr-2">
              <div className="col-4">
                <form action="">
                  <select
                    name="company"
                    id=""
                    className="custom-select custom-select-sm"
                    onChange={this.changeCompany.bind(this)}
                    value={this.state.selectedCompanyId}
                  >
                    {companyOptions}
                  </select>
                </form>
              </div>
              <div className="col-4">
                <form action="">
                  <select
                    name="branch"
                    id=""
                    className="custom-select custom-select-sm"
                    onChange={this.changeBranch.bind(this)}
                    value={this.state.selectedBranchId}
                  >
                    {branchOptions}
                  </select>
                </form>
              </div>
            </div>

            {/** main content starts here */}

            <div className="main-content mt-4 pl-4">
              {/*show child pages based on conditions*/}
              {childPage.toUpperCase() === "ALLSALES" && <AllSales />}
              {childPage.toUpperCase() === "ACCOUNTREPORT" && <AccountReport />}
              {childPage.toUpperCase() === "ALLSTOCK" && (
                <AllStock branches={this.state.branches} />
              )}
              {childPage.toUpperCase() === "ATTENDANCE" && (
                <Attendance branches={this.state.branches} />
              )}
              {childPage.toUpperCase() === "BRANCHES" && <Branches />}
              {childPage.toUpperCase() === "CASHSALES" && (
                <CashSales branches={this.state.branches} />
              )}
              {childPage.toUpperCase() === "COMPANIES" && <Companies />}
              {childPage.toUpperCase() === "CREDITSALES" && (
                <CreditSales branches={this.state.branches} />
              )}
              {childPage.toUpperCase() === "DEBTS" && <Debts />}
              {childPage.toUpperCase() === "EXHAUSTEDSTOCK" && (
                <ExhaustedStock branches={this.state.branches} />
              )}
              {childPage.toUpperCase() === "EXPENSES" && <Expenses />}
              {childPage.toUpperCase() === "EXPIREDSTOCK" && (
                <ExpiredStock branches={this.state.branches} />
              )}
              {childPage.toUpperCase() === "ONLINESALES" && (
                <OnlineSales branches={this.state.branches} />
              )}
              {childPage.toUpperCase() === "STAFFLIST" && (
                <StaffList branches={this.state.branches} />
              )}
              {childPage.toUpperCase() === "PRODUCTREPORT" && <ProductReport />}
              {childPage.toUpperCase() === "STOCKACTIVITIES" && (
                <StockActivities />
              )}
              {childPage.toUpperCase() === "SETTINGS" && <Settings />}

              {childPage.toUpperCase() === "" && <DashboardPage />}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  companies: propTypes.array.isRequired,
  branches: propTypes.array.isRequired,
  getCompanyBranches: propTypes.func.isRequired,
  getCompanies: propTypes.func.isRequired,
  getCompany: propTypes.func.isRequired,
  getBranch: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  companies: state.companies.items,
  company: state.companies.item,
  branches: state.branches.items,
  branch: state.branches.item,
});

export default connect(mapStateToProps, {
  getCompanyBranches,
  getCompanies,
  getCompany,
  getBranch,
})(Dashboard);
