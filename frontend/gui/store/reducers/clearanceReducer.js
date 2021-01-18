import { GET_ALL_CLEARANCE } from "../actions/types";

const initialState = {
  items: [],
  item: {},
};

export default function clearanceReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CLEARANCE:
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
}
