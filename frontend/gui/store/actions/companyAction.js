import { GET_COMPANIES, GET_COMPANY, GET_ERRORS } from "./types";
import axiosInstance from "Modules/axiosInstance";

export const getCompanies = () => (dispatch) => {
  axiosInstance
    .get("http://127.0.0.1:8000/companies/")
    .then((res) =>
      dispatch({
        type: GET_COMPANIES,
        payload: res.data,
      })
    )
    .catch((err) => console.log(err.message));
};

export const getCompany = (id) => (dispatch) => {
  console.log(process.env);
  axiosInstance
    .get(`http://127.0.0.1:8000/companies/${id}/`)
    .then((res) => {
      dispatch({
        type: GET_COMPANY,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

//load companies again
const loadCompanies = () => (dispatch) => {
  axiosInstance
    .get("http://127.0.0.1:8000/companies/")
    .then((res) =>
      dispatch({
        type: GET_COMPANIES,
        payload: res.data,
      })
    )
    .catch((err) => console.log(err.message));
};

export const createCompany = (data) => (dispatch) => {
  axiosInstance
    .post("http://127.0.0.1:8000/companies/", data)
    .then((res) => {
      loadCompanies()(dispatch);
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};
