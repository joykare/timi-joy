import React, { Component } from "react";
import PropTypes from "prop-types";
import Login from "./Login";
import Logout from "./Logout";

export default class Navbar extends Component {
  static propTypes = {
    authActions: PropTypes.object,
    isAuthenticated: PropTypes.bool,
    errorMessage: PropTypes.string
  }

  handleOnLoginClick = (credentials) => {
    this.props.authActions.loginUser(credentials);
  }

  handleOnLogoutClick = () => {
    this.props.authActions.logoutUser();
  }

  renderMainNavBar() {
    const { isAuthenticated, errorMessage } = this.props;

    return (
      <nav className='navbar navbar-default'>
        <div className='container-fluid'>
          <a className="navbar-brand" href="#">Marvel App</a>
          <div className='navbar-form'>

            {!isAuthenticated &&
              <Login
                errorMessage={errorMessage}
                onLoginClick={this.handleOnLoginClick}
              />
            }

            {isAuthenticated &&
              <Logout onLogoutClick={this.handleOnLogoutClick} />
            }

          </div>
        </div>
      </nav>
    );
  }

  renderSubNav() {
    return (
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb" style={{backgroundColor: "white"}}>
          <li className="breadcrumb-item"><a href="#">Home</a></li>
          <li className="breadcrumb-item active" aria-current="page">Library</li>
        </ol>
      </nav>
    );
  }

  render() {
    return (
      <div>
        {this.renderMainNavBar()}
        {this.renderSubNav()}
      </div>
    );
  }

}