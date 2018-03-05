import request from "superagent";
import * as constants from "../constants";

export function saveRequest(event) {
  return {
    type: constants.SAVE_EVENT_REQUEST,
    event
  };
}

export function saveSuccess(event) {
  return {
    type: constants.SAVE_EVENT_SUCCESS,
    event
  };
}

export function historyRequest() {
  return {
    type: constants.HISTORY_GET_REQUEST
  };
}

export function historySuccess(events) {
  return {
    type: constants.HISTORY_GET_SUCCESS,
    events
  };
}

export function historyFailure(error) {
  return {
    type: constants.HISTORY_GET_FAILURE,
    error
  };
}

export function saveClickHistory(character) {
  return (dispatch) => {
    dispatch(saveRequest(character));

    const token = localStorage.getItem("access_token");
    return (
      request
        .post("http://localhost:3000/api/events")
        .set("x-access-token", token)
        .send(character)
        .then(response => {
          dispatch(saveSuccess(response.body));
        }).catch(err => {
          throw err;
        })
    );
  };
}

export function fetchClickHistory() {
  return (dispatch) => {
    dispatch(historyRequest());

    const token = localStorage.getItem("access_token");

    return (
      request
        .get("http://localhost:3000/api/events")
        .set("x-access-token", token)
        .then(response => {
          dispatch(historySuccess(response.body));
        }).catch(err => {
          dispatch(historyFailure(err.response.body.message));
        })
    );
  };
}