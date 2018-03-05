import request from "superagent";
import * as constants from "../constants";

export function charactersRequest() {
  return {
    type: constants.CHARACTERS_GET_REQUEST
  };
}

export function charactersSuccess(characters) {
  return {
    type: constants.CHARACTERS_GET_SUCCESS,
    characters
  };
}

export function charactersFailure(error) {
  return {
    type: constants.CHARACTERS_GET_FAILURE,
    error
  };
}

export function fetchCharacters() {
  return (dispatch) => {
    dispatch(charactersRequest());

    const token = localStorage.getItem("access_token");

    return (
      request
        .get("http://localhost:3000/api/marvel_characters")
        .set("x-access-token", token)
        .then(response => {
          dispatch(charactersSuccess(response.body));
        }).catch(err => {
          dispatch(charactersFailure(err.response.body.message));
        })
    );
  };
}

export function saveClickHistory(character) {
  return (dispatch) => {
    dispatch(saveRequest(character));

    const token = localStorage.getItem("access_token");
    return (
      request
        .post("http://localhost:3000/api/event")
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