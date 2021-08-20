import { GET_SALES, GET_PREV_SALES } from "../actions/types";

const initialState = {
  items: [],
  item: {},
  prevItems: [],
};

export default function salesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SALES:
      return {
        ...state,
        items: action.payload,
      };

    case GET_PREV_SALES:
      return {
        ...state,
        prevItems: action.payload,
      };
    default:
      return state;
  }
}
