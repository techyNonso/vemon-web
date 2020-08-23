import { combineReducers } from "redux";
import branchReducer from "./branchReducer";

export default combineReducers({
  branches: branchReducer,
});
