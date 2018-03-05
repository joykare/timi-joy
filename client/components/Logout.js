import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Logout extends Component {
  static propTypes = {
    onLogoutClick: PropTypes.func.isRequired
  }

  handleLogout = () => {
    this.props.onLogoutClick();
  }
  render() {
    return (
      <button onClick={this.handleLogout} className="btn btn-primary">
        Logout
      </button>
    );
  }
}