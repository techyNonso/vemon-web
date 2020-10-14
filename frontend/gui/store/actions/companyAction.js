import { GET_COMPANIES, GET_COMPANY } from "./types";
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
  //console.log(id);
  axiosInstance
    .get(`http://127.0.0.1:8000/companies/${id}/`)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: GET_COMPANY,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
