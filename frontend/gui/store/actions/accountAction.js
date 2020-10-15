import { GET_USER } from "./types";
import axiosInstance from "Modules/axiosInstance";

export const getCompanies = () => (dispatch) => {
  axiosInstance
    .get("http://127.0.0.1:8000/user/")
    .then((res) =>
      dispatch({
        type: GET_USER,
        payload: res.data,
      })
    )
    .catch((err) => console.log(err.message));
};
