import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "../actions/Auth";
import * as charactersActions from "../actions/MarvelCharacters";
import Navbar from "./Navbar";
import MarvelDisplayList from "./MarvelDisplayList";
import MarvelDetailPage from "./MarvelDetailPage";

class App extends Component {
  static propTypes = {
    authActions: PropTypes.object,
    charactersActions: PropTypes.object,
    characters: PropTypes.array,
    isAuthenticated: PropTypes.bool,
    errorMessage: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
      character: {}
    };
  }

  handleClick = (character) => {
    this.setState({
      character,
      isClicked: true
    });
  }

  handleBackClick = () => {
    this.setState({
      isClicked: false
    });
  }

  displayMarvelPage() {
    const { isClicked, character } = this.state;
    const { characters, charactersActions, isFetching } = this.props;

    if (isClicked) {
      return (
        <MarvelDetailPage
          character={character}
          handleBackClick={this.handleBackClick}
        />
      );
    }
    return (
      <MarvelDisplayList
        charactersActions={charactersActions}
        characters={characters}
        handleClick={this.handleClick}
        isFetching={isFetching} />
    );
  }

  render() {
    const { authActions, isAuthenticated, errorMessage } = this.props;
    return (
      <div>
        <Navbar
          isAuthenticated={isAuthenticated}
          errorMessage={errorMessage}
          authActions={authActions}
        />
        <div className='container'>
          {isAuthenticated ?
            this.displayMarvelPage()
            :
            <h2 style={{ textAlign: "center" }}> Sign up form here </h2>
          }
        </div>
      </div>
    );
  }
}
// These props come from the application's
// state when it is started
function mapStateToProps(state) {

  const { auth, marvel_characters } = state;
  const { isAuthenticated, errorMessage } = auth;
  const { characters, isFetching } = marvel_characters;

  return {
    isAuthenticated,
    errorMessage,
    characters,
    isFetching
  };
}

function mapDispatchToProps(dispatch){
  return {
    authActions: bindActionCreators(authActions, dispatch),
    charactersActions: bindActionCreators(charactersActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
