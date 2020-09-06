import { GET_SALES } from "../actions/types";

const initialState = {
  items: [],
  item: {},
};

export default function salesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SALES:
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
}
