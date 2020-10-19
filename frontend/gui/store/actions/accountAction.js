import { GET_USER } from "./types";
import axiosInstance from "Modules/axiosInstance";
import { store } from "../store.js";
import Auth from "Components/auth";
export const saveUser = (values) => {
  store.dispatch({
    type: GET_USER,
    payload: values,
  });

  //save user as online
  Auth.login();
};
