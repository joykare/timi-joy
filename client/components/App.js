import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "../actions/Auth";
import * as charactersActions from "../actions/MarvelCharacters";
import * as eventActions from "../actions/Events";
import Navbar from "./Navbar";
import MarvelDisplayList from "./MarvelDisplayList";
import MarvelDetailPage from "./MarvelDetailPage";
import UserHistoryPage from "./UserHistoryPage";

class App extends Component {
  static propTypes = {
    authActions: PropTypes.object,
    charactersActions: PropTypes.object,
    characters: PropTypes.array,
    eventActions: PropTypes.object,
    event: PropTypes.object,
    fetchingEvents: PropTypes.bool,
    isAuthenticated: PropTypes.bool,
    isFetching: PropTypes.bool,
    errorMessage: PropTypes.string,
    user_events: PropTypes.array,
  }

  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
      character: {},
      page: "home"
    };
  }

  handleClick = (character) => {
    const characterClick = {
      characterName: character.name
    };
    this.props.eventActions.saveClickHistory(characterClick);
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

  handleNavBarClick = (name) => {
    this.setState({
      page: name
    });
  }

  displayMarvelPage() {
    const { isClicked, character, page } = this.state;
    const { characters, charactersActions, isFetching,  eventActions, user_events, fetchingEvents} = this.props;

    if (page === "home") {
      return (
        <div>
          {isClicked ?
            <MarvelDetailPage
              character={character}
              handleBackClick={this.handleBackClick}
            /> :
            <MarvelDisplayList
              charactersActions={charactersActions}
              characters={characters}
              handleClick={this.handleClick}
              isFetching={isFetching} />
          }
        </div>
      );
    }
    return (
      <UserHistoryPage
        eventActions={eventActions}
        events={user_events}
        isFetching={fetchingEvents}
      />
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
          handleNavBarClick={this.handleNavBarClick}
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

function mapStateToProps(state) {

  const { auth, marvel_characters, events } = state;
  const { isAuthenticated, errorMessage } = auth;
  const { characters, isFetching } = marvel_characters;
  const user_events = events.events;
  const event = events.event;
  const fetchingEvents = events.isFetching;

  return {
    isAuthenticated,
    errorMessage,
    characters,
    isFetching,
    user_events,
    fetchingEvents,
    event
  };
}

function mapDispatchToProps(dispatch){
  return {
    authActions: bindActionCreators(authActions, dispatch),
    charactersActions: bindActionCreators(charactersActions, dispatch),
    eventActions: bindActionCreators(eventActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
