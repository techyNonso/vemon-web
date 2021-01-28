import React, { useEffect, useState } from "react";

export default function validate(values) {
  let errors = {};
  if (!values.firstname.trim()) {
    errors.firstname = "Firstname is required";
  }

  if (!values.lastname.trim()) {
    errors.lastname = "Lastname is required";
  }

  return errors;
}
