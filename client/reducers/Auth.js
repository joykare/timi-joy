import * as constants from "../constants";

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export default function auth(state = {
  isFetching: false,
  isAuthenticated: localStorage.getItem("id_token") ? true : false
}, action) {
  switch (action.type) {
  case constants.SIGNUP_REQUEST:
  case constants.LOGIN_REQUEST:
    return Object.assign({}, state, {
      isFetching: true,
      isAuthenticated: false,
      user: action.creds
    });
  case constants.SIGNUP_SUCCESS:
  case constants.LOGIN_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      isAuthenticated: true,
      errorMessage: ""
    });
  case constants.SIGNUP_FAILURE:
  case constants.LOGIN_FAILURE:
    return Object.assign({}, state, {
      isFetching: false,
      isAuthenticated: false,
      errorMessage: action.message
    });
  case constants.LOGOUT_SUCCESS:
    return Object.assign({}, state, {
      isFetching: true,
      isAuthenticated: false
    });
  default:
    return state;
  }
}

