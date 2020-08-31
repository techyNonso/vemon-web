import { GET_BRANCHES, GET_BRANCH } from "./types";
import axios from "axios";

export const getCompanyBranches = (company) => (dispatch) => {
  // console.log(company);
  axios
    .get(`http://127.0.0.1:8000/branches/${company}`)
    .then((res) =>
      dispatch({
        type: GET_BRANCHES,
        payload: res.data,
      })
    )
    .catch((err) => console.log(err));
};

export const getBranch = (id) => (dispatch) => {
  //console.log(id);
  axios
    .get(`http://127.0.0.1:8000/branches/branch/${id}`)
    .then((res) =>
      dispatch({
        type: GET_BRANCH,
        payload: res.data,
      })
    )
    .catch((err) => console.log(err));
};
