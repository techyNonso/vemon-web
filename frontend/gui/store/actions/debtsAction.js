import debtsReducer from "../reducers/debtsReducer";
import { GET_DEBTS } from "./types";
import axios from "axios";

export const getDebts = (company, branch) => (dispatch) => {
  axios
    .get(`http://127.0.0.1:8000/debts/company/${company}/${branch}/`)
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
