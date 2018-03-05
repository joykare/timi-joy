import * as constants from "../constants";

export default function marvel_characters(state = {
  isFetching: false,
  characters: [],
  errorMessage: ""
}, action) {
  switch (action.type) {
  case constants.CHARACTERS_GET_REQUEST:
    return Object.assign({}, state, {
      isFetching: true,
      characters: action.characters
    });
  case constants.CHARACTERS_GET_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      characters: action.characters
    });
  case constants.CHARACTERS_GET_FAILURE:
    return Object.assign({}, state, {
      isFetching: false,
      errorMessage: action.message
    });
  default:
    return state;
  }
}

