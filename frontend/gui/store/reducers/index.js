import { combineReducers } from "redux";
import branchReducer from "./branchReducer";
import stockReducer from "./stockReducer";
import salesReducer from "./salesReducer";
import activityReducer from "./activitiesReducer";
import companyReducer from "./companyReducer";
import debtsReducer from "./debtsReducer";
import expenseReducer from "./expenseReducer";
import staffReducer from "./staffReducer";
import clearanceReducer from "./clearanceReducer";
import attendanceReducer from "./attendanceReducer";
import accountReducer from "./accountReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["branches", "companies", "account"],
};

const rootReducer = combineReducers({
  branches: branchReducer,
  activities: activityReducer,
  stocks: stockReducer,
  companies: companyReducer,
  sales: salesReducer,
  debts: debtsReducer,
  expenses: expenseReducer,
  staff: staffReducer,
  attendance: attendanceReducer,
  clearance: clearanceReducer,
  account: accountReducer,
});

export default persistReducer(persistConfig, rootReducer);
