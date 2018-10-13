import React, { Component } from 'react';

class CharacterBox extends Component {
  inputChange(ev) {
    const characterCopy = this.props.box.slice();
    characterCopy[ev.target.name.split('character')[1]] = ev.target.value === '' ? ' ' : ev.target.value;
    this.props.changeBoxCharacter(characterCopy);
  }

  render() {
    return (
      <div>
        {
          this.props.box.map(
            (box, index) =>
              <input
                type="text"
                key={index}
                maxLength="1"
                name={`character${index}`}
                onChange={this.inputChange.bind(this)}
                className="character-box"
              />)
        }
      </div>
    );
  }
}

export default CharacterBox;
