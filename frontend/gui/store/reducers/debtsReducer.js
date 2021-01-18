import { GET_DEBTS } from "../actions/types";

const initialState = {
  items: [],
  item: {},
};

export default function debtsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DEBTS:
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
}
