import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "./header";

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
  }

  render() {
    //get child page if specified
    let childPage =
      this.props.match.params.page !== undefined
        ? this.props.match.params.page
        : "";

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
                  >
                    <option value="">Company</option>
                    <option value="companyA">Company A</option>
                    <option value="companyB">Company B</option>
                  </select>
                </form>
              </div>
              <div className="col-4">
                <form action="">
                  <select
                    name="company"
                    id=""
                    className="custom-select custom-select-sm"
                  >
                    <option value="">Branch</option>
                    <option value="branchA">Branch A</option>
                    <option value="branchB">Branch B</option>
                  </select>
                </form>
              </div>
            </div>

            <div className="row mt-3 pl-3 pr-3">
              <div className="col-md-6 pb-2">
                <span>
                  <strong>Branches</strong> : 1 of 4{" "}
                </span>
              </div>

              <div className="col-md-6 pb-2">
                <form action="" className="form">
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Search"
                      className="form-control"
                    />
                  </div>
                </form>
              </div>
            </div>

            {/** main content starts here */}

            <div className="main-content mt-4 pl-4">
              {/*show child pages based on conditions*/}
              {childPage.toUpperCase() === "ALLSALES" && <AllSales />}
              {childPage.toUpperCase() === "ACCOUNTREPORT" && <AccountReport />}
              {childPage.toUpperCase() === "ALLSTOCK" && <AllStock />}
              {childPage.toUpperCase() === "ATTENDANCE" && <Attendance />}
              {childPage.toUpperCase() === "BRANCHES" && <Branches />}
              {childPage.toUpperCase() === "CASHSALES" && <CashSales />}
              {childPage.toUpperCase() === "COMPANIES" && <Companies />}
              {childPage.toUpperCase() === "CREDITSALES" && <CreditSales />}
              {childPage.toUpperCase() === "DEBTS" && <Debts />}
              {childPage.toUpperCase() === "EXHAUSTEDSTOCK" && (
                <ExhaustedStock />
              )}
              {childPage.toUpperCase() === "EXPENSES" && <Expenses />}
              {childPage.toUpperCase() === "EXPIREDSTOCK" && <ExpiredStock />}
              {childPage.toUpperCase() === "ONLINESALES" && <OnlineSales />}
              {childPage.toUpperCase() === "STAFFLIST" && <StaffList />}
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

export default Dashboard;