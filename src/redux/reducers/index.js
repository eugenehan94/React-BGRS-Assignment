import { combineReducers } from "redux";
import { fetchReducer } from "./fetchReducer";

const reducer = combineReducers({
  apiData: fetchReducer,
});

export default reducer;
