import React, { useEffect, useState } from "react";
import axiosInstance from "Modules/axiosInstance";

export default function useForm(validate, history) {
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
    password2: "",
  });

  const [errors, setErrors] = useState({});

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
    setErrors(validate(values));

    //submit to api
    /*
    axiosInstance
      .post("register/", {
        first_name: values.firstname,
        last_name: values.lastname,
        email: values.email,
        phone: values.phone,
        password: values.password,
        password2: values.password2,
      })
      .then((res) => {
        history.push("/signin");

        console.log(res.data);
      })
      .catch((err) => console.log(err.message));
      */
  };

  return { handleChange, values, errors, handleSubmit };
}
