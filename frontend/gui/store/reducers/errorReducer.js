import { GET_ERRORS } from "../actions/types";

const initialState = {
  item: {},
};

export default function errorReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        item: action.payload,
      };
    default:
      return state;
  }
}
