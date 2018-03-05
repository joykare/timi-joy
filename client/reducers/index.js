import { combineReducers } from "redux";
import auth from "./Auth";
import marvel_characters from "./MarvelCharacters";
import events from "./Events";

// We combine the reducers here so that they
// can be left split apart above
const reducers = combineReducers({
  auth,
  events,
  marvel_characters
});

export default reducers;