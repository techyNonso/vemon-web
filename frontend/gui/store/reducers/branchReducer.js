import { GET_BRANCHES } from "../actions/types";

const initialState = {
  items: [],
  item: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_BRANCHES:
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
}
