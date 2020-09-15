import clearanceReducer from "../reducers/clearanceReducer";
import { GET_ALL_CLEARANCE } from "./types";
import axios from "axios";

export const getClearance = (company, branch) => (dispatch) => {
  axios
    .get(`http://127.0.0.1:8000/clearance/company/${company}/${branch}/`)
    .then((res) =>
      dispatch({
        type: GET_ALL_CLEARANCE,
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
