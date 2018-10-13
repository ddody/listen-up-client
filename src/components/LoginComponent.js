import React, { Component } from 'react';
import MenuComponent from './MenuComponent';

class Login extends Component {
  render() {
    if (this.props.isLogin) {
      return <MenuComponent onChallengeClick={this.props.onChallengeClick} />
    } else {
      return (
        <div className="login">
          <button className="btn-login" onClick={this.props.onLoginClick}>Login</button>
        </div>
      )
    }
  }
}

export default Login;
