import React, { Component } from "react";
import PropTypes from "prop-types";

class Login extends Component {
  static propTypes = {
    onLoginClick: PropTypes.func,
    errorMessage: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      passwword: ""
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleClick = () => {
    const { email, password } = this.state;
    const credentials = { email, password };

    this.props.onLoginClick(credentials);
  }

  render() {
    const { errorMessage } = this.props;
    return (
      <div>
        <input type="text" name="email" className="form-control" onChange={this.handleChange} placeholder="Email" />
        <input type="password" name="password" className="form-control" onChange={this.handleChange} placeholder="Password" />
        <button onClick={this.handleClick} className="btn btn-primary">
          Login
        </button>
        {errorMessage && <p className="alert alert-danger" style={{ marginTop: 10 }}>{errorMessage}</p>}
      </div>
    );
  }
}

export default Login;