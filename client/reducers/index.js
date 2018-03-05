import { combineReducers } from "redux";
import auth from "./Auth";

// We combine the reducers here so that they
// can be left split apart above
const reducers = combineReducers({
  auth
});

export default reducers;