import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "../actions/Auth";
import * as charactersActions from "../actions/MarvelCharacters";
import Navbar from "./Navbar";
import MarvelDisplayList from "./MarvelDisplayList";

class App extends Component {
  static propTypes = {
    authActions: PropTypes.object,
    charactersActions: PropTypes.object,
    characters: PropTypes.array,
    isAuthenticated: PropTypes.bool,
    errorMessage: PropTypes.string,
  }

  render() {
    const { authActions, isAuthenticated, errorMessage, characters, charactersActions } = this.props;
    return (
      <div>
        <Navbar
          isAuthenticated={isAuthenticated}
          errorMessage={errorMessage}
          authActions={authActions}
        />
        <div className='container'>
          {isAuthenticated ?
            <MarvelDisplayList
              charactersActions={charactersActions}
              characters={characters}
            /> :
            <h2 style={{ textAlign: "center" }}> Not authorized </h2>
          }
        </div>
      </div>
    );
  }
}
// These props come from the application's
// state when it is started
function mapStateToProps(state) {

  const { auth, characters } = state;
  const { isAuthenticated, errorMessage } = auth;

  return {
    isAuthenticated,
    errorMessage,
    characters
  };
}

function mapDispatchToProps(dispatch){
  return {
    authActions: bindActionCreators(authActions, dispatch),
    charactersActions: bindActionCreators(charactersActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
