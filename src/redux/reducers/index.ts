import { combineReducers } from "@reduxjs/toolkit";
import dashboardActions from "./dashboardReducer";
import { CONSTANTS } from "../../constants/constants";

const rootReducer = combineReducers({
  [CONSTANTS.REDUCERS.DASHBOARD]: dashboardActions,
});

export default rootReducer;
