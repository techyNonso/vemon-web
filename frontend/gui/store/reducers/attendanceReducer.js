import { GET_ALL_ATTENDANCE } from "../actions/types";

const initialState = {
  items: [],
  item: {},
};

export default function attendanceReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_ATTENDANCE:
      return {
        ...state,
        items: action.payload,
      };

    default:
      return state;
  }
}
