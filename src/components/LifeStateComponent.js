import React, { Component } from 'react';

class LifeStateComponent extends Component {

  render() {
    let lifeArr = [];
    for (var i = 0; i < this.props.life; i++) {
      lifeArr.push("");
    }
    return lifeArr.map((life, index) => <span key={index} className="life-icon">star</span>)
  }
}

export default LifeStateComponent;
