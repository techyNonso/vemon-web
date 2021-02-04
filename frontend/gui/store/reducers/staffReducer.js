import { GET_ALL_STAFF, GET_STAFF } from "../actions/types";

const initialState = {
  items: [],
  item: {},
};

export default function staffReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_STAFF:
      return {
        ...state,
        items: action.payload,
      };

    case GET_STAFF:
      return {
        ...state,
        item: action.payload,
      };
    default:
      return state;
  }
}
