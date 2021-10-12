import { GET_USER, GET_ERRORS } from "./types";
import axiosInstance from "Modules/axiosInstance";
import { store } from "../store.js";
import Auth from "Components/auth";
import swal from "sweetalert";

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
    expiration_limit: values.expirationLimit,
    stock_limit: values.stockLimit,
  };

  axiosInstance
    .put(`http://127.0.0.1:8000/user-update/`, data)
    .then((res) => {
      dispatch({
        type: GET_USER,
        payload: values,
      });

      swal({
        title: "Account Update Successful",
        //text :" Name change successful",
        icon: "success",
        button: "OK",
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const updateDetails = (values) => (dispatch) => {
  let data = {
    first_name: values.first_name,
    last_name: values.last_name,
  };

  axiosInstance
    .put(`http://127.0.0.1:8000/user-update/`, data)
    .then((res) => {
      dispatch({
        type: GET_USER,
        payload: values,
      });
      swal({
        title: "Account Update Successful",
        //text :" Name change successful",
        icon: "success",
        button: "OK",
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};
