import { GET_PRICE_LIST, GET_PRICE } from "../actions/types";

const initialState = {
  items: [],
  item: {},
};

export default function pricingReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRICE_LIST:
      return {
        ...state,
        items: action.payload,
      };
    case GET_PRICE:
      return {
        ...state,
        item: action.payload,
      };

    default:
      return state;
  }
}
