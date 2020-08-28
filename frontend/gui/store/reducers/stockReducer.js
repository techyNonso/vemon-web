import { GET_STOCKS } from "../actions/types";

const initialState = {
  items: [],
  item: {},
};

export default function stockReducer(state = initialState, action) {
  switch (action.type) {
    case GET_STOCKS:
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
}
