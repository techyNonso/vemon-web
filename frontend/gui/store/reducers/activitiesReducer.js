import { GET_ACTIVITIES, GET_ACTIVITY } from "Store/actions/types";

const initialState = {
  items: [],
  item: {},
};

export default function activityReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ACTIVITIES:
      return {
        ...state,
        items: action.payload,
      };

    case GET_ACTIVITY:
      return {
        ...state,
        item: action.payload,
      };

    default:
      return state;
  }
}
