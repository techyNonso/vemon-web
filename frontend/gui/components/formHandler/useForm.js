import React, { useEffect, useState } from "react";
import axiosInstance from "Modules/axiosInstance";
import swal from "sweetalert";
import axios from "axios";

export default function useForm(validate, history, formType, saveUser = false) {
  const decode = (token, refresh) => {
    let base64url = token.split(".")[1];
    let base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
    let jsonpayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    let data = JSON.parse(jsonpayload);

    if (data.user_type == "admin") {
      localStorage.setItem("access_token", token);
      localStorage.setItem("refresh_token", refresh);

      axiosInstance.defaults.headers["Authorization"] =
        "JWT " + localStorage.getItem("access_token");

      let values = {
        email: data.email,
        expirationLimit: data.expirationLimit,
        first_name: data.first_name,
        last_name: data.last_name,
        stockLimit: data.stockLimit,
        user_id: data.user_id,
        download_access: data.download_access,
      };

      saveUser(values);

      history.push("/");
    } else {
      swal({
        title: "Please login with a business owner account",
        //text :" Name change successful",
        icon: "error",
        button: "OK",
      });
    }
  };

  let initialValues;
  if (formType == "signup") {
    initialValues = {
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      password: "",
      password2: "",
    };
  } else if (formType == "signin") {
    initialValues = {
      email: "",
      password: "",
    };
  }
  const [values, setValues] = useState(initialValues);

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (submitted) {
      //submit to api if react did not find any error
      if (
        Object.keys(errors).length === 0 &&
        errors.constructor === Object &&
        formType == "signup"
      ) {
        axios
          .post("http://127.0.0.1:8000/register/", {
            first_name:
              values.firstname.charAt(0).toUpperCase() +
              values.firstname.slice(1),
            last_name:
              values.lastname.charAt(0).toUpperCase() +
              values.lastname.slice(1),
            email: values.email,
            phone: values.phone,
            password: values.password,
            password2: values.password2,
            rank: "admin",
          })
          .then((res) => {
            history.push("/signin");
          })
          .catch((err) => {
            let data = err.response.data;
            setErrors({
              firstname: data.first_name ? data.first_name.toString() : "",
              lastname: data.last_name ? data.last_name.toString() : "",
              email: data.email ? data.email.toString() : "",
              phone: data.phone ? data.phone.toString() : "",
              password: data.password ? data.password.toString() : "",
              password2: data.password2 ? data.password2.toString() : "",
            });
          });
      } else if (
        Object.keys(errors).length === 0 &&
        errors.constructor === Object &&
        formType == "signin"
      ) {
        axios
          .post("http://127.0.0.1:8000/login/", {
            email: values.email,
            password: values.password,
          })
          .then((res) => {
            //decode access token
            console.log(res.data);
            decode(res.data.access, res.data.refresh);
          })
          .catch((err) => {
            setErrors({
              credentials: "Invalid Credentials",
            });
          });
      }
    }
  }, [errors]);

  //input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  //submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);
    setErrors(validate(values, formType));
  };

  return { handleChange, values, errors, handleSubmit };
}
