import * as constants from "../constants";

export default function events(state = {
  isFetching: false,
  events: [],
  event: {},
  errorMessage: ""
}, action) {
  switch (action.type) {
  case constants.HISTORY_GET_REQUEST:
    return Object.assign({}, state, {
      isFetching: true
    });
  case constants.HISTORY_GET_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      events: action.events
    });
  case constants.SAVE_EVENT_REQUEST:
    return Object.assign({}, state, {
      isFetching: true,
      event: action.event
    });
  case constants.SAVE_EVENT_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false
    });
  case constants.HISTORY_GET_FAILURE:
    return Object.assign({}, state, {
      isFetching: false,
      errorMessage: action.message
    });
  default:
    return state;
  }
}

