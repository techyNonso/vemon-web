import React,{Component} from 'react';
import Header from './header';
import Footer from './footer';

class Dashboard extends Component {

    constructor(props){
        super(props)
    }

    render() {
        return(
            <div>

                <Header/>

    
    <div className="wrapper ">
      <nav id="sidebar">
        <div className="mt-3 text-right pr-3">
          <button
            type="button"
            id="innerSidebarCollapse"
            className="btn btn-sm btn-success hide"
          >
            <span><i className="fa fa-bars"></i></span>
          </button>
        </div>

        <ul className="lisst-unstyled components">
          <li className="active">
            <a href="dashboard.html">Dashboard</a>
          </li>

          <li>
            <a
              href="#stockSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
              >Stock</a
            >
            <ul className="collapse lisst-unstyled" id="stockSubmenu">
              <li>
                <a href="allStock.html">All</a>
              </li>
              <li>
                <a href="expiredStock.html">Expired</a>
              </li>
              <li>
                <a href="exhaustedStock.html">Exhausted</a>
              </li>
              <li>
                <a href="stockActivities.html">Activities</a>
              </li>
            </ul>
          </li>

          <li>
            <a
              href="#salesSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
              >Sales</a
            >
            <ul className="collapse lisst-unstyled" id="salesSubmenu">
              <li>
                <a href="allSales.html">All</a>
              </li>
              <li>
                <a href="cashSales.html">Cash</a>
              </li>

              <li>
                <a href="creditSales.html">Credit</a>
              </li>
              <li>
                <a href="onlineSales.html">Online</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="debts.html">Debts</a>
          </li>
          <li>
            <a href="expenses.html">Expenses</a>
          </li>
          <li>
            <a href="companies.html">Companies</a>
          </li>
          <li>
            <a href="branches.html">Branches</a>
          </li>
          <li>
            <a
              href="#staffSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
              >Staff</a
            >
            <ul className="collapse lisst-unstyled" id="staffSubmenu">
              <li>
                <a href="staffList.html">List</a>
              </li>
              <li>
                <a href="attendance.html">Attendance</a>
              </li>
            </ul>
          </li>

          <li>
            <a
              href="#reportSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
              >Reports</a
            >
            <ul className="collapse lisst-unstyled" id="reportSubmenu">
              <li>
                <a href="accountReport.html">Account</a>
              </li>
              <li>
                <a href="productReport.html">Product</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="settings.html">Settings</a>
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
              <span><i className="fa fa-bars"></i></span>
            </button>
            <strong className="pl-2">Liscence No: A98BG09DR383</strong>
          </div>
        </nav>
        <div
          className="row border border-top-0 border-left-0 border-right-0 pb-3 pl-3 pr-2"
        >
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
            <span><strong>Branches</strong> : 1 of 4 </span>
          </div>

          <div className="col-md-6 pb-2">
            <form action="" className="form">
              <div className="form-group">
                <input type="text" placeholder="Search" className="form-control" />
              </div>
            </form>
          </div>
        </div>
       
        <div className="main-content mt-4 pl-4">
          main
        </div>
      </div>
    </div>
    
   
    </div>
        )
    }


}


export default Dashboard