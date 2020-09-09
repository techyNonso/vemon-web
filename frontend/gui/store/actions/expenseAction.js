import expenseReducer from "../reducers/expenseReducer";
import { GET_EXPENSES } from "./types";
import axios from "axios";

export const getExpenses = (company, branch) => (dispatch) => {
  axios
    .get(`http://127.0.0.1:8000/expenses/company/${company}/${branch}/`)
    .then((res) =>
      dispatch({
        type: GET_EXPENSES,
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
