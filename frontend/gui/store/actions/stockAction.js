import stockReducer from "../reducers/stockReducer";
import { GET_STOCKS } from "./types";
import axios from "axios";
import axiosInstance from "Modules/axiosInstance";
export const getStocks = (company, branch) => (dispatch) => {
  axiosInstance
    .get(`http://127.0.0.1:8000/stock/${company}/${branch}/`)
    .then((res) =>
      dispatch({
        type: GET_STOCKS,
        payload: res.data,
      })
    )
    .catch((err) => console.error(err));
};
