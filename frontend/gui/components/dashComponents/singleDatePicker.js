import React, { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SingleDatePicker = (props) => {
  const [date, setDate] = useState(new Date());

  return (
    <DatePicker
      selected={date}
      dateFormat="yyyy-MM-dd"
      onChange={(date) => {
        props.func(date);
        setDate(date);
      }}
    />
  );
};

export default SingleDatePicker;
