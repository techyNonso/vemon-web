import { GET_ALL_ATTENDANCE } from "./types";
import axios from "axios";

export const getAllAttendance = (company, branch) => (dispatch) => {
  // console.log(company);
  axios
    .get(`http://127.0.0.1:8000/attendance/company/${company}/${branch}/`)
    .then((res) =>
      dispatch({
        type: GET_ALL_ATTENDANCE,
        payload: res.data,
      })
    )
    .catch((err) => console.log(err));
};

/*
export const getStaff = (id) => (dispatch) => {
  //console.log(id);
  axios
    .get(`http://127.0.0.1:8000/staff/${id}`)
    .then((res) =>
      dispatch({
        type: GET_STAFF,
        payload: res.data,
      })
    )
    .catch((err) => console.log(err));
};
*/
