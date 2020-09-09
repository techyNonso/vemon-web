import { GET_COMPANIES, GET_COMPANY } from "./types";
import axios from "axios";

export const getCompanies = () => (dispatch) => {
  axios
    .get("http://127.0.0.1:8000/companies/")
    .then((res) =>
      dispatch({
        type: GET_COMPANIES,
        payload: res.data,
      })
    )
    .catch((err) => console.log(err));
};

export const getCompany = (id) => (dispatch) => {
  // console.log(id);
  axios
    .get(`http://127.0.0.1:8000/companies/${id}/`)
    .then((res) =>
      dispatch({
        type: GET_COMPANY,
        payload: res.data,
      })
    )
    .catch((err) => console.log(err));
};
