import { GET_EXPENSES } from "../actions/types";

const initialState = {
  items: [],
  item: {},
};

export default function expenseReducer(state = initialState, action) {
  switch (action.type) {
    case GET_EXPENSES:
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
}
