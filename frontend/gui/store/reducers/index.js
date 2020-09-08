import { combineReducers } from "redux";
import branchReducer from "./branchReducer";
import stockReducer from "./stockReducer";
import salesReducer from "./salesReducer";
import activityReducer from "./activitiesReducer";
import companyReducer from "./companyReducer";
import debtsReducer from "./debtsReducer";
import expenseReducer from "./expenseReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["branches", "companies"],
};

const rootReducer = combineReducers({
  branches: branchReducer,
  activities: activityReducer,
  stocks: stockReducer,
  companies: companyReducer,
  sales: salesReducer,
  debts: debtsReducer,
  expenses: expenseReducer,
});

export default persistReducer(persistConfig, rootReducer);
