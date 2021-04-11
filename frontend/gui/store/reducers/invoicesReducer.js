import { GET_INVOICES } from "../actions/types";

const initialState = {
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
    default:
      return state;
  }
}
