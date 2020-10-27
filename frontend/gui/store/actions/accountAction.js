import { GET_USER } from "./types";
import axiosInstance from "Modules/axiosInstance";
import { store } from "../store.js";
import Auth from "Components/auth";

import { toast } from "react-toastify";
export const saveUser = (values) => {
  store.dispatch({
    type: GET_USER,
    payload: values,
  });

  //save user as online
  Auth.login();
};

export const updateLimits = (values) => (dispatch) => {
  let data = {
    expiration_limit: values.expiration_limit,
    stock_limit: values.stockLimit,
  };

  axiosInstance
    .put(`http://127.0.0.1:8000/user-update/`, data)
    .then((res) => {
      dispatch({
        type: GET_USER,
        payload: values,
      });
    })
    .catch((err) => console.log(err.response.data));
};

export const updateDetails = (values) => (dispatch) => {
  let data = {
    first_name: values.first_name,
    last_name: values.last_name,
  };

  axiosInstance
    .put(`http://127.0.0.1:8000/user-update/`, data)
    .then((res) => {
      toast.success("Your details have been updated successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 6000,
      });
      dispatch({
        type: GET_USER,
        payload: values,
      });
    })
    .catch((err) => console.log(err.response.data));
};
