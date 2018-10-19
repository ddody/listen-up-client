import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const LifeStateComponent = (props) => {
  let lifeArr = [];
  for (var i = 0; i < props.life; i++) {
    lifeArr.push("");
  }
  return lifeArr.map((life, index) => (
    <span key={index} className="life-icon">
      <FontAwesomeIcon
        icon="heart"
        style={{ color: '#e62e2e' }}
        spin
      />
    </span>)
  );
};

export default LifeStateComponent;
