import React, { useEffect, useState } from "react";
import {
  verifyPhoneNumber,
  COUNTRY_CODE,
} from "nigerian-phone-number-validator";

export default function validate(values, formType) {
  let errors = {};
  if (formType == "signup") {
    if (!values.firstname.trim()) {
      errors.firstname = "Firstname is required.";
    } else if (!/^[a-zA-Z]+$/.test(values.firstname.trim())) {
      errors.firstname = "Please enter a Valid first name.";
    }

    if (!values.lastname.trim()) {
      errors.lastname = "Lastname is required.";
    } else if (!/^[a-zA-Z]+$/.test(values.lastname.trim())) {
      errors.lastname = "Please enter a Valid last name.";
    }

    if (
      !/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(
        values.email
      )
    ) {
      errors.email = "Please enter a valid email address.";
    }

    if (!verifyPhoneNumber(values.phone)) {
      errors.phone = "Please enter a valid phone number";
    }

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#?=&])[A-Za-z\d@$!%*#?=&]{6,}$/.test(
        values.password
      )
    ) {
      errors.password =
        "Password should have a minimum of 6 characters, an upper case, lower case and a special key";
    }

    if (values.password !== values.password2) {
      errors.password2 = "Passwords do not match.";
    }
  } else if (formType == "signin") {
    if (
      !/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(
        values.email
      )
    ) {
      errors.email = "Please enter a valid email address.";
    }

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#?=&])[A-Za-z\d@$!%*#?=&]{6,}$/.test(
        values.password
      )
    ) {
      errors.password =
        "Password should have a minimum of 6 characters, an upper case, lower case and a special key";
    }
  }
  return errors;
}
