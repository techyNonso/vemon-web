import React, { useReducer } from "react";
import {
  DateRangeInput,
  DateSingleInput,
  Datepicker,
} from "@datepicker-react/styled";
//datepicker

const initialState = {
  startDate: new Date(),
  endDate: new Date(),
  focusedInput: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "focusChange":
      return {
        ...state,
        focusedInput: action.payload,
      };

    case "dateChange":
      return action.payload;
    default:
      throw new Error();
  }
}

function DateRangeSelect(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DateRangeInput
      onDatesChange={(data) => {
        //pass data to a function in parent component
        props.parentFunc(data);
        return dispatch({ type: "dateChange", payload: data });
      }}
      onFocusChange={(focusedInput) =>
        dispatch({ type: "focusChange", payload: focusedInput })
      }
      startDate={state.startDate} // Date or null
      endDate={state.endDate} // Date or null
      focusedInput={state.focusedInput} // START_DATE, END_DATE or null
    />
  );
}

export default DateRangeSelect;
