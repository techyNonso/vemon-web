import React, { Component, Fragment, useState } from "react";
//import DateRangeSelect from "Components/dashComponents/dateRangeSelect";
import propTypes from "prop-types";
import { connect } from "react-redux";
import Pagination from "Components/dashComponents/pagination";
import { getCompanies, getCompany } from "Store/actions/companyAction";
import axios from "axios";
import { getSearchResult, sortCompanies } from "Modules/company";

//import bootstrap component
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";

class Companies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      companies: [],
      originalCompanies: [],
      postsPerPage: 100,
      currentPage: 1,
      searchValue: "",
      displayModal: false,
      company: "",
      deleteClick: false,
      editClick: false,
      display: "",
    };

    this.handleProps = this.handleProps.bind(this);
  }

  handleProps(props) {
    //sort companies
    let sortedList = sortCompanies(props.companies);
    this.setState({
      companies: sortedList,
      originalCompanies: sortedList,
      loading: false,
    });
  }

  //add branch
  addBranch() {
    //check branch maximum
    if (
      this.props.company.plan.toUpperCase() == "PREMIUM ADVANCE" &&
      this.state.branches.length > 3
    ) {
      console.log("Maximum branch reached");
    } else {
      //get id
      let id = "BR" + Math.floor(1000 + Math.random() * 1000);

      //declare data
      let data = {
        branchId: id,
        companyId: this.props.company.companyId,
      };
      this.setState({
        loading: true,
      });

      axios
        .post(`http://127.0.0.1:8000/branches/`, data)
        .then((res) =>
          this.props.getCompanyBranches(this.props.company.companyId)
        )
        .catch((err) => console.log(err));
    }
  }

  editCompany(event) {
    this.setState({
      editClick: true,
      display: "edit",
    });
    let id = event.target.dataset.id;
    this.props.getCompany(id);
  }

  //delete branch
  deleteCompany(event) {
    this.setState({
      deleteClick: true,
      display: "delete",
    });
    let id = event.target.dataset.id;

    this.props.getCompany(id);
  }

  //proceed to delete
  proceedDelete(id) {
    this.setState({
      loading: true,
      deleteClick: false,
    });

    axios
      .delete(`http://127.0.0.1:8000/companies/${id}/`)
      .then((res) => {
        this.setState({
          displayModal: false,
          loading: false,
        });

        this.props.getCompanies();
      })
      .catch((err) => console.log(err));
  }

  //proceed to update
  proceedUpdate({ id, plan, name }) {
    this.setState({
      loading: true,
      editClick: false,
    });

    let data = {
      companyName: name,
      plan: plan,
    };

    axios
      .put(`http://127.0.0.1:8000/companies/${id}/`, data)
      .then((res) => {
        this.setState({
          displayModal: false,
          loading: false,
        });

        this.props.getCompanies();
      })
      .catch((err) => console.log(err));
  }

  //change modal state to false
  hideDisplay() {
    this.setState({
      displayModal: false,
      deleteClick: false,
    });
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
        this.state.originalCompanies,
        event.target.value
      );

      if (list.length > 0) {
        this.setState({
          companies: list,
          loading: false,
        });
      } else {
        //set list back to original list
        this.setState({
          companies: [],
          loading: false,
        });
      }
    } else {
      //if search box is empty
      this.setState({
        companies: this.state.originalCompanies,
        loading: false,
      });
    }
  }

  //wait for when our props arrive
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.companies !== this.props.companies) {
      this.handleProps(this.props);
    }

    //check if activity changes and a click was done
    if (
      prevProps.company !== this.props.company &&
      (this.state.deleteClick || this.state.editClick)
    ) {
      //check if company has branches
      if (Number(this.props.company.branches) > 0) {
        console.log(
          "you need to delete all branches associated with this company first"
        );
      } else {
        this.setState({ displayModal: true, company: this.props.company });
      }
    }
  }

  componentDidMount() {
    this.setState({
      loading: true,
    });
    //check companies
    if (this.props.companies.length > 0) {
      this.handleProps(this.props);
    } else {
      this.props.getCompanies();
    }
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
    const currentPosts = this.state.companies.slice(
      indexOfFirstPost,
      indexOfLastPost
    );

    let companyList;
    //check list
    if (currentPosts.length > 0) {
      companyList = currentPosts.map((company) => (
        <tr key={company.id}>
          <td>{company.companyId}</td>
          <td>{company.companyName}</td>
          <td>{company.plan}</td>
          <td>{company.branches}</td>

          <td>
            <button
              className="btn btn-sm btn-primary"
              data-id={company.id}
              onClick={this.editCompany.bind(this)}
            >
              Edit
            </button>
          </td>

          <td>
            <button
              className="btn btn-sm btn-danger"
              data-id={company.id}
              onClick={this.deleteCompany.bind(this)}
            >
              Delete
            </button>
          </td>
        </tr>
      ));
    } else {
      companyList = (
        <tr>
          <td>No record found</td>
        </tr>
      );
    }

    //change the page
    const paginate = (pageNumber) => this.setState({ currentPage: pageNumber });

    //work with modal
    let modal = null;
    if (this.state.displayModal) {
      modal = (
        <ActMod
          modState={this.hideDisplay.bind(this)}
          proceedDelete={this.proceedDelete.bind(this)}
          proceedUpdate={this.proceedUpdate.bind(this)}
          company={this.state.company}
          display={this.state.display}
        />
      );
    }

    return (
      <Fragment>
        {modal}
        <div className="row mt-3 pl-3 pr-3">
          <div className="col-md-6 pb-2"></div>
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
                <th>Company Id</th>
                <th>Company Name</th>
                <th>Plan</th>
                <th>Branches</th>
                <th colSpan="2">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading}

              {companyList}
            </tbody>
          </table>
        </div>

        <div className="row mt-4">
          <div className="col text-center">
            <button className="btn btn-success">Add Company</button>
          </div>
        </div>

        <Pagination
          postsPerPage={this.state.postsPerPage}
          totalPosts={this.state.companies.length}
          paginate={paginate}
        />
      </Fragment>
    );
  }
}

Companies.propTypes = {
  getCompanies: propTypes.func.isRequired,
  getCompany: propTypes.func.isRequired,
  companies: propTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  companies: state.companies.items,
  company: state.companies.item,
});

export default connect(mapStateToProps, { getCompanies, getCompany })(
  Companies
);

//write modal for this app
const ActMod = (props) => {
  const [isOpen, setIsOpen] = useState(true);
  const [plan, setPlan] = useState(props.company.plan);
  const [name, setName] = useState(props.company.companyName);

  const showModal = () => {
    setIsOpen(false);
  };

  const hideModal = () => {
    setIsOpen(false);
    props.modState();
  };

  const hideModalWithDelete = (event) => {
    setIsOpen(false);
    props.proceedDelete(event.target.dataset.id);
  };

  const hideModalWithUpdate = (event) => {
    setIsOpen(false);
    props.proceedUpdate({ id: event.target.dataset.id, name, plan });
  };

  const changeSelect = (event) => {
    setPlan(event.target.value);
  };

  const changeName = (event) => {
    setName(event.target.value);
  };

  //check for display type

  let displayBody;
  let btn;
  if (props.display == "edit") {
    displayBody = (
      <form className="form">
        <div className="form-group">
          <input
            placeholder="Company name"
            className="form-control"
            value={name}
            onChange={changeName}
          />
        </div>

        <div className="form-group">
          <select className="form-control" value={plan} onChange={changeSelect}>
            <option value="">select</option>
            <option value="standard">Standard</option>
            <option value="premium advance">Premium advance</option>
          </select>
        </div>
      </form>
    );

    btn = (
      <button
        className="btn btn-sm btn-primary"
        data-id={props.company.id}
        onClick={hideModalWithUpdate}
      >
        Proceed
      </button>
    );
  } else if (props.display == "delete") {
    displayBody = <span>Do you wish to delete this company ?</span>;

    btn = (
      <button
        className="btn btn-sm btn-primary"
        data-id={props.company.id}
        onClick={hideModalWithDelete}
      >
        Proceed
      </button>
    );
  }
  return (
    <Modal show={isOpen} onHide={hideModal}>
      <ModalHeader>
        <ModalTitle>Company ID: {props.company.companyId}</ModalTitle>
      </ModalHeader>

      <ModalBody>{displayBody}</ModalBody>
      <ModalFooter>
        <button className="btn btn-sm btn-secondary" onClick={hideModal}>
          Cancel
        </button>

        {btn}
      </ModalFooter>
    </Modal>
  );
};
