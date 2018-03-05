import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "../actions/Auth";
import Navbar from "./Navbar";

class App extends Component {
  static propTypes = {
    authActions: PropTypes.object,
    isAuthenticated: PropTypes.bool,
    errorMessage: PropTypes.string,
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
          Hey
        </div>
      </div>
    );
  }
}

// These props come from the application's
// state when it is started
function mapStateToProps(state) {

  const { auth } = state;
  const { isAuthenticated, errorMessage } = auth;

  return {
    isAuthenticated,
    errorMessage
  };
}

function mapDispatchToProps(dispatch){
  return {
    authActions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
