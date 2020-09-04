import stockReducer from "../reducers/stockReducer";
import { GET_ACTIVITIES, GET_ACTIVITY } from "./types";
import axios from "axios";

export const getActivities = (company, branch) => (dispatch) => {
  axios
    .get(`http://127.0.0.1:8000/stockactivity/company/${company}/${branch}`)
    .then((res) =>
      dispatch({
        type: GET_ACTIVITIES,
        payload: res.data,
      })
    )
    .catch((err) => console.error(err));
};

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
