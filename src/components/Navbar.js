import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <nav
        className="clearfix">
          {
            this.props.isLogin ?
              <Link to="/">
                <button
                  className="btn-logout"
                  onClick={this.props.onUserLogout}>Logout
                </button>
              </Link>
              : null
          }
      </nav>
    )
  }
}

export default Navbar;