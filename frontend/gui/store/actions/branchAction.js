import { GET_BRANCHES, GET_BRANCH } from "./types";
import axios from "axios";
import axiosInstance from "Modules/axiosInstance";

export const getCompanyBranches = (company) => (dispatch) => {
  axiosInstance
    .get(`http://127.0.0.1:8000/branches/${company}/`)
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
  axiosInstance
    .get(`http://127.0.0.1:8000/branches/branch/${id}/`)
    .then((res) =>
      dispatch({
        type: GET_BRANCH,
        payload: res.data,
      })
    )
    .catch((err) => console.log(err));
};
