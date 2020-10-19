import { GET_USER } from "./types";
import axiosInstance from "Modules/axiosInstance";
import { store } from "../store.js";
export const saveUser = (values) => {
  store.dispatch({
    type: GET_USER,
    payload: values,
  });
};
