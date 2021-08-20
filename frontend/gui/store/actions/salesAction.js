import salesReducer from "../reducers/salesReducer";
import { GET_SALES, GET_PREV_SALES } from "./types";
import axios from "axios";
import axiosInstance from "Modules/axiosInstance";

const getLength = (num) => num.toString().length;

//get sales by branch
export const getSales = (company, branch, startDate, endDate) => (dispatch) => {
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
      `http://127.0.0.1:8000/sales/company/${company}/${branch}/${startYear}/${startMonth}/${startDay}/${endYear}/${endMonth}/${endDay}/`
    )
    .then((res) =>
      dispatch({
        type: GET_SALES,
        payload: res.data,
      })
    )
    .catch((err) => console.error(err));
};

//get previous sales by branch
export const getPrevSales = (company, branch, startDate, endDate) => (
  dispatch
) => {
  let d = new Date(startDate);
  let prevDay = new Date(d.setDate(d.getDate() - 1));

  let startYear = prevDay.getFullYear();
  let startMonth =
    getLength(prevDay.getMonth() + 1) == 1
      ? "0" + Number(prevDay.getMonth() + 1)
      : prevDay.getMonth() + 1;
  let startDay =
    getLength(prevDay.getDate()) == 1
      ? "0" + prevDay.getDate()
      : prevDay.getDate();

  let endYear = prevDay.getFullYear();
  let endMonth =
    getLength(prevDay.getMonth() + 1) == 1
      ? "0" + Number(prevDay.getMonth() + 1)
      : prevDay.getMonth() + 1;
  let endDay =
    getLength(prevDay.getDate()) == 1
      ? "0" + prevDay.getDate()
      : prevDay.getDate();

  axiosInstance
    .get(
      `http://127.0.0.1:8000/sales/company/${company}/${branch}/${startYear}/${startMonth}/${startDay}/${endYear}/${endMonth}/${endDay}/`
    )
    .then((res) =>
      dispatch({
        type: GET_PREV_SALES,
        payload: res.data,
      })
    )
    .catch((err) => console.error(err));
};

export const getSalesPerCompany = (company, startDate, endDate) => (
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
      `http://127.0.0.1:8000/sales/company/${company}/${startYear}/${startMonth}/${startDay}/${endYear}/${endMonth}/${endDay}/`
    )
    .then((res) =>
      dispatch({
        type: GET_SALES,
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
