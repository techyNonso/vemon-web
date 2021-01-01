import React, { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SingleDatePicker = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  {/**const ExampleCustomInput = ({ value, onClick }) => (
    <button className="" onClick={onClick}>
      {value}
    </button>
  );**/}
  return (
    <DatePicker
      selected={startDate}
      onChange={date => setStartDate(date)}
      showYearPicker
      dateFormat="yyyy"
      //customInput={<ExampleCustomInput />}
    />
  );
};

export default SingleDatePicker;

