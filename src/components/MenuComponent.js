import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MenuComponent extends Component {
  render() {
    return (
      <div className="main">
        <ul className="menu">
          <li onClick={this.props.onChallengeClick}>Challenge</li>
          <li><Link to="/create">Create</Link></li>
          <li><Link to="/ranking">Ranking</Link></li>
          <li><Link to="/wrong-answer">Wrong Answer</Link></li>
        </ul>
      </div>
    )
  }
}

export default MenuComponent;