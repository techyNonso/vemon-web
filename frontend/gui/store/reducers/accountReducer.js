import { GET_USER } from "../actions/types";

const initialState = {
  item: {},
};

export default function accountReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        item: action.payload,
      };

    default:
      return state;
  }
}
