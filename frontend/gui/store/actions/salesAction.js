import salesReducer from "../reducers/salesReducer";
import { GET_SALES } from "./types";
import axios from "axios";

export const getSales = (company, branch) => (dispatch) => {
  axios
    .get(`http://127.0.0.1:8000/sales/company/${company}/${branch}`)
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
