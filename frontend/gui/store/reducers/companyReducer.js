import { GET_COMPANIES, GET_COMPANY } from "../actions/types";

const initialState = {
  items: [],
  item: {},
};

export default function companyReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMPANIES:
      return {
        ...state,
        items: action.payload,
      };
    case GET_COMPANY:
      return {
        ...state,
        item: action.payload,
      };

    default:
      return state;
  }
}
