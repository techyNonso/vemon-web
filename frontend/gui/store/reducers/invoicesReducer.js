import { GET_INVOICES, GET_PREV_INVOICES } from "../actions/types";

const initialState = {
  prevItems: [],
  items: [],
  item: {},
};

export default function invoicesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_INVOICES:
      return {
        ...state,
        items: action.payload,
      };
    case GET_PREV_INVOICES: {
      return {
        ...state,
        prevItems: action.payload,
      };
    }
    default:
      return state;
  }
}
