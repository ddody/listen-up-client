import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.jpg';

class Navbar extends Component {
  render() {
    return (
      <nav
        className="clearfix">
          {
            this.props.token ?
              <Link to="/" className="btn-logout">
                <button
                  onClick={this.props.onUserLogout}>Logout
                </button>
              </Link>
              : null
          }
          <Link to="/" className="logo">
            <img src={logo} alt="logo"/>
          </Link>
      </nav>
    )
  }
}

export default Navbar;