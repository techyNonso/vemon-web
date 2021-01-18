import { GET_BRANCHES, GET_BRANCH } from "../actions/types";

const initialState = {
  items: [],
  item: {},
};

export default function branchReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BRANCHES:
      return {
        ...state,
        items: action.payload,
      };
    case GET_BRANCH:
      return {
        ...state,
        item: action.payload,
      };
    default:
      return state;
  }
}
