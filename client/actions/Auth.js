import request from "superagent";
import * as constants from "../constants";

function requestLogout() {
  return {
    type: constants.LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  };
}

function receiveLogout() {
  return {
    type: constants.LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  };
}

function requestLogin(credentials) {
  return {
    type: constants.LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    credentials
  };
}

function receiveLogin(user) {
  return {
    type: constants.LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token
  };
}

function loginError(message) {
  return {
    type: constants.LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  };
}


function requestSignUp(credentials) {
  return {
    type: constants.SIGNUP_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    credentials
  };
}

function receiveSignUp(user) {
  return {
    type: constants.SIGNUP_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token
  };
}

function signUpError(message) {
  return {
    type: constants.SIGNUP_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  };
}

export function loginUser(credentials) {
  const config = {
    method: "POST",
    headers: { "Content-Type":"application/x-www-form-urlencoded" },
    body: `email=${credentials.email}&password=${credentials.password}`
  };

  return dispatch => {
    dispatch(requestLogin(credentials));
    return (
      request
        .post("http://localhost:3000/api/user/login", config)
        .send(credentials)
        .then((response) => {
          // If login was successful, set the token in local storage
          localStorage.setItem("access_token", response.body.token);
          dispatch(receiveLogin(response.body));
        }).catch((err) => {
          dispatch(loginError(err.response.body));
        })
    );
  };
}

export function signupUser(credentials) {
  return dispatch => {
    dispatch(requestSignUp(credentials));
    return (
      request
        .post("/api/user")
        .send(credentials)
        .then((response) => {
          localStorage.setItem("access_token", response.body.token);
          dispatch(receiveSignUp(response.body));
        }).catch((err) => {
          dispatch(signUpError(err.response.body));
        })
    );
  };
}


// Logs the user out
export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout());
    localStorage.removeItem("id_token");
    localStorage.removeItem("access_token");
    dispatch(receiveLogout());
  };
}
