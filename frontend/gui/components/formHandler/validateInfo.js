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
      errors.firstname = "Please enter a valid first name.";
    }

    if (!values.lastname.trim()) {
      errors.lastname = "Lastname is required.";
    } else if (!/^[a-zA-Z]+$/.test(values.lastname.trim())) {
      errors.lastname = "Please enter a valid last name.";
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
  } else if (formType == "contact") {
    if (!values.firstname.trim()) {
      errors.firstname = "Firstname is required.";
    } else if (!/^[a-zA-Z]+$/.test(values.firstname.trim())) {
      errors.firstname = "Please enter a valid first name.";
    }

    if (!values.lastname.trim()) {
      errors.lastname = "Lastname is required.";
    } else if (!/^[a-zA-Z]+$/.test(values.lastname.trim())) {
      errors.lastname = "Please enter a valid last name.";
    }

    if (
      !/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(
        values.email
      )
    ) {
      errors.email = "Please enter a valid email address.";
    }

    if (!values.message.trim()) {
      errors.message = "Message is required.";
    }

    if (!values.department.trim()) {
      errors.department = "Please select a department for this message.";
    }
  } else if (formType == "emailValidation") {
    if (
      !/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(
        values.email
      )
    ) {
      errors.email = "Please enter a valid email address.";
    }
  } else if (formType == "passwordValidation") {
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
  }
  return errors;
}
