import debtsReducer from "../reducers/debtsReducer";
import { GET_DEBTS } from "./types";
import axios from "axios";
import axiosInstance from "Modules/axiosInstance";

const getLength = (num) => num.toString().length;

export const getDebts = (company, branch, startDate, endDate) => (dispatch) => {
  let startYear = startDate.getFullYear();
  let startMonth =
    getLength(startDate.getMonth() + 1) == 1
      ? "0" + Number(startDate.getMonth() + 1)
      : startDate.getMonth() + 1;
  let startDay =
    getLength(startDate.getDate()) == 1
      ? "0" + startDate.getDate()
      : startDate.getDate();

  let endYear = endDate.getFullYear();
  let endMonth =
    getLength(endDate.getMonth() + 1) == 1
      ? "0" + Number(endDate.getMonth() + 1)
      : endDate.getMonth() + 1;
  let endDay =
    getLength(endDate.getDate()) == 1
      ? "0" + endDate.getDate()
      : endDate.getDate();

  axiosInstance
    .get(
      `http://127.0.0.1:8000/credit-invoices/company/${company}/${branch}/${startYear}/${startMonth}/${startDay}/${endYear}/${endMonth}/${endDay}/`
    )
    .then((res) =>
      dispatch({
        type: GET_DEBTS,
        payload: res.data,
      })
    )
    .catch((err) => console.error(err));
};

export const getDebtsPerCompany = (company, startDate, endDate) => (
  dispatch
) => {
  let startYear = startDate.getFullYear();
  let startMonth =
    getLength(startDate.getMonth() + 1) == 1
      ? "0" + Number(startDate.getMonth() + 1)
      : startDate.getMonth() + 1;
  let startDay =
    getLength(startDate.getDate()) == 1
      ? "0" + startDate.getDate()
      : startDate.getDate();

  let endYear = endDate.getFullYear();
  let endMonth =
    getLength(endDate.getMonth() + 1) == 1
      ? "0" + Number(endDate.getMonth() + 1)
      : endDate.getMonth() + 1;
  let endDay =
    getLength(endDate.getDate()) == 1
      ? "0" + endDate.getDate()
      : endDate.getDate();

  axiosInstance
    .get(
      `http://127.0.0.1:8000/credit-invoices/company/${company}/${startYear}/${startMonth}/${startDay}/${endYear}/${endMonth}/${endDay}/`
    )
    .then((res) =>
      dispatch({
        type: GET_DEBTS,
        payload: res.data,
      })
    )
    .catch((err) => console.error(err));
};

/*
export const getActivity = (id) => (dispatch) => {
  axios
    .get(`http://127.0.0.1:8000/stockactivity/${id}`)
    .then((res) =>
      dispatch({
        type: GET_ACTIVITY,
        payload: res.data,
      })
    )
    .catch((err) => console.error(err));
};
*/
