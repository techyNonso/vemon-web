import React, { Component, Redirect } from "react";
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
import Formatter from "Components/dashComponents/Formatter";

import { sortCompanies } from "Modules/company";

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
      altSideBar: "",
      allStock: "",
      expired: "",
      exhausted: "",
      activities: "",
      allSale: "",
      cashSale: "",
      creditSale: "",
      onlineSale: "",
      debts: "",
      expenses: "",
      companiesLink: "",
      branchesLink: "",
      staffList: "",
      attendance: "",
      account: "",
      product: "",
      setting: "",
      dashboard: "",
      stock: "",
      sale: "",
      staff: "",
      report: "",
    };
    //this.handleProps = this.handleProps.bind(this);
  }

  componentDidMount() {
    //fix link
    this.organizeLinks();

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

  //handle side bar show
  showSideBar() {
    this.setState({
      altSideBar: "anonSideBar",
    });
  }

  hideSideBar() {
    this.setState({
      altSideBar: "",
    });
  }

  emptyLinks() {
    this.setState({
      allStock: "",
      expired: "",
      exhausted: "",
      activities: "",
      allSale: "",
      cashSale: "",
      creditSale: "",
      onlineSale: "",
      debts: "",
      expenses: "",
      companiesLink: "",
      branchesLink: "",
      staffList: "",
      attendance: "",
      account: "",
      product: "",
      setting: "",
      dashboard: "",
      stock: "",
      sale: "",
      staff: "",
      report: "",
    });
  }

  organizeLinks() {
    if (this.props.location.pathname.split("/").length > 2) {
      switch (this.props.location.pathname.split("/")[2].toUpperCase()) {
        case "ALLSTOCK":
          this.emptyLinks();
          this.setState({
            allStock: "active",
            stock: "active",
          });
          break;

        case "EXPIREDSTOCK":
          this.emptyLinks();
          this.setState({
            expired: "active",
            stock: "active",
          });
          break;

        case "EXHAUSTEDSTOCK":
          this.emptyLinks();
          this.setState({
            exhausted: "active",
            stock: "active",
          });
          break;

        case "STOCKACTIVITIES":
          this.emptyLinks();
          this.setState({
            activities: "active",
            stock: "active",
          });
          break;

        case "ALLSALES":
          this.emptyLinks();
          this.setState({
            allSale: "active",
            sale: "active",
          });
          break;

        case "CASHSALES":
          this.emptyLinks();
          this.setState({
            cashSale: "active",
            sale: "active",
          });
          break;

        case "CREDITSALES":
          this.emptyLinks();
          this.setState({
            creditSale: "active",
            sale: "active",
          });
          break;

        case "ONLINESALES":
          this.emptyLinks();
          this.setState({
            onlineSale: "active",
            sale: "active",
          });
          break;

        case "DEBTS":
          this.emptyLinks();
          this.setState({
            debts: "active",
          });
          break;

        case "EXPENSES":
          this.emptyLinks();
          this.setState({
            expenses: "active",
          });
          break;

        case "COMPANIES":
          this.emptyLinks();
          this.setState({
            companiesLink: "active",
          });
          break;

        case "BRANCHES":
          this.emptyLinks();
          this.setState({
            branchesLink: "active",
          });
          break;
        case "STAFFLIST":
          this.emptyLinks();
          this.setState({
            staffList: "active",
            staff: "active",
          });
          break;

        case "ATTENDANCE":
          this.emptyLinks();
          this.setState({
            attendance: "active",
            staff: "active",
          });
          break;

        case "ACCOUNTREPORT":
          this.emptyLinks();
          this.setState({
            account: "active",
            report: "active",
          });
          break;

        case "PRODUCTREPORT":
          this.emptyLinks();
          this.setState({
            product: "active",
            report: "active",
          });
          break;

        case "SETTINGS":
          this.emptyLinks();
          this.setState({
            setting: "active",
          });
          break;
        default:
          break;
      }
    } else {
      this.emptyLinks();
      this.setState({
        dashboard: "active",
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location !== this.props.location) {
      //fix link
      this.organizeLinks();
    }
    if (prevProps.companies !== this.props.companies) {
      let sortedCompanies = sortCompanies(this.props.companies);
      //check length for sortedCompanies
      sortedCompanies.length > 0
        ? this.props.getCompany(sortedCompanies[0].id)
        : "";

      this.setState({
        companies: this.props.companies,
      });
    }

    if (prevProps.company !== this.props.company) {
      //get branches for this company
      this.props.getCompanyBranches(this.props.company.companyId);

      this.setState({
        selectedCompany: this.props.company,
        selectedCompanyId: this.props.company.id,
      });
    }

    if (prevProps.branches !== this.props.branches) {
      this.setState({
        branches: this.props.branches,
      });

      //check if they are branches
      if (this.props.branches.length > 0) {
        this.props.getBranch(this.props.branches[0].id);
      }
    }

    if (prevProps.branch !== this.props.branch) {
      this.setState({
        selectedBranch: this.props.branch,
        selectedBranchId: this.props.branch.id,
      });
    }
  }

  render() {
    //get  page if specified
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

    //array of child pages
    let childPageArray = [
      "ALLSALES",
      "ACCOUNTREPORT",
      "ALLSTOCK",
      "ATTENDANCE",
      "BRANCHES",
      "CASHSALES",
      "COMPANIES",
      "CREDITSALES",
      "DEBTS",
      "EXHAUSTEDSTOCK",
      "EXPENSES",
      "EXPIREDSTOCK",
      "ONLINESALES",
      "STAFFLIST",
      "PRODUCTREPORT",
      "STOCKACTIVITIES",
      "SETTINGS",
    ];
    if (childPageArray.indexOf(childPage.toUpperCase()) == -1) {
      childPage = "";
    }
    return (
      <div>
        <Header location={this.props.location.pathname} />

        <div className="wrapper ">
          <nav className={`sidebar ${this.state.altSideBar}`}>
            <div className="mt-3 text-right pr-3 innerMenu">
              <button
                type="button"
                id="innerSidebarCollapse"
                className="btn btn-sm btn-success hide"
                onClick={this.hideSideBar.bind(this)}
              >
                <span>
                  <i className="fa fa-bars"></i>
                </span>
              </button>
            </div>

            <ul className="lisst-unstyled components">
              <li className={this.state.dashboard}>
                <Link to="/dashboard">Dashboard</Link>
              </li>

              <li className={this.state.stock}>
                <a
                  href="#stockSubmenu"
                  data-toggle="collapse"
                  aria-expanded="false"
                  className="dropdown-toggle"
                >
                  Stock
                </a>
                <ul className="collapse lisst-unstyled" id="stockSubmenu">
                  <li className={this.state.allStock}>
                    <Link to="/dashboard/allStock">All</Link>
                  </li>
                  <li className={this.state.expired}>
                    <Link to="/dashboard/expiredStock">Expired</Link>
                  </li>
                  <li className={this.state.exhausted}>
                    <Link to="/dashboard/exhaustedStock">Exhausted</Link>
                  </li>
                  <li className={this.state.activities}>
                    <Link to="/dashboard/stockActivities">Activities</Link>
                  </li>
                </ul>
              </li>

              <li className={this.state.sale}>
                <a
                  href="#salesSubmenu"
                  data-toggle="collapse"
                  aria-expanded="false"
                  className="dropdown-toggle"
                >
                  Sales
                </a>
                <ul className="collapse lisst-unstyled" id="salesSubmenu">
                  <li className={this.state.allSale}>
                    <Link to="/dashboard/allSales">All</Link>
                  </li>
                  <li className={this.state.cashSale}>
                    <Link to="/dashboard/cashSales">Cash</Link>
                  </li>

                  <li className={this.state.creditSale}>
                    <Link to="/dashboard/creditSales">Credit</Link>
                  </li>
                  <li className={this.state.onlineSale}>
                    <Link to="/dashboard/onlineSales">Online</Link>
                  </li>
                </ul>
              </li>
              <li className={this.state.debts}>
                <Link to="/dashboard/debts">Debts</Link>
              </li>
              <li className={this.state.expenses}>
                <Link to="/dashboard/expenses">Expenses</Link>
              </li>
              <li className={this.state.companiesLink}>
                <Link to="/dashboard/companies">Companies</Link>
              </li>
              <li className={this.state.branchesLink}>
                <Link to="/dashboard/branches">Branches</Link>
              </li>
              <li className={this.state.staff}>
                <a
                  href="#staffSubmenu"
                  data-toggle="collapse"
                  aria-expanded="false"
                  className="dropdown-toggle"
                >
                  Staff
                </a>
                <ul className="collapse lisst-unstyled" id="staffSubmenu">
                  <li className={this.state.staffList}>
                    <Link to="/dashboard/staffList">List</Link>
                  </li>
                  <li className={this.state.attendance}>
                    <Link to="/dashboard/attendance">Attendance</Link>
                  </li>
                </ul>
              </li>

              <li className={this.state.report}>
                <a
                  href="#reportSubmenu"
                  data-toggle="collapse"
                  aria-expanded="false"
                  className="dropdown-toggle"
                >
                  Reports
                </a>
                <ul className="collapse lisst-unstyled" id="reportSubmenu">
                  <li className={this.state.account}>
                    <Link to="/dashboard/accountReport">Account</Link>
                  </li>
                  <li className={this.state.product}>
                    <Link to="/dashboard/productReport">Product</Link>
                  </li>
                </ul>
              </li>
              <li className={this.state.setting}>
                <Link to="/dashboard/settings">Settings</Link>
              </li>
            </ul>
          </nav>

          <div id="content">
            <nav className=" pl-4 pb-3">
              <div className="altMenu">
                <button
                  type="button"
                  className="btn btn-sm btn-success "
                  onClick={this.showSideBar.bind(this)}
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
              {childPage.toUpperCase() === "ALLSALES" && (
                <AllSales branches={this.state.branches} />
              )}
              {childPage.toUpperCase() === "ACCOUNTREPORT" && (
                <AccountReport branches={this.state.branches} />
              )}
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
              {childPage.toUpperCase() === "DEBTS" && (
                <Debts branches={this.state.branches} />
              )}
              {childPage.toUpperCase() === "EXHAUSTEDSTOCK" && (
                <ExhaustedStock branches={this.state.branches} />
              )}
              {childPage.toUpperCase() === "EXPENSES" && (
                <Expenses branches={this.state.branches} />
              )}
              {childPage.toUpperCase() === "EXPIREDSTOCK" && (
                <ExpiredStock branches={this.state.branches} />
              )}
              {childPage.toUpperCase() === "ONLINESALES" && (
                <OnlineSales branches={this.state.branches} />
              )}
              {childPage.toUpperCase() === "STAFFLIST" && (
                <StaffList branches={this.state.branches} />
              )}
              {childPage.toUpperCase() === "PRODUCTREPORT" && (
                <ProductReport branches={this.state.branches} />
              )}
              {childPage.toUpperCase() === "STOCKACTIVITIES" && (
                <StockActivities branches={this.state.branches} />
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
  user: state.account.item,
});

export default connect(mapStateToProps, {
  getCompanyBranches,
  getCompanies,
  getCompany,
  getBranch,
})(Dashboard);
