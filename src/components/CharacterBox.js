import React, { Component } from 'react';

class CharacterBox extends Component {
  constructor(props) {
    super(props);
    this._handleKeyPress = this._handleKeyPress.bind(this);
  }

  inputChange(ev) {
    const characterCopy = this.props.box.slice();
    characterCopy[ev.target.name.split('character')[1]] = ev.target.value === '' ? ' ' : ev.target.value;
    this.props.changeBoxCharacter(characterCopy);
  }

  _handleKeyPress(e, field) {
    if (e.keyCode === 32) {
      e.preventDefault();
      let next = this.refs[field.name].nextSibling;
      if (next && next.classList.contains('character-blank')) {
        next = this.refs[field.name].nextSibling.nextSibling;
      }
      if (next && next.tagName === "INPUT") {
        next.focus();
      }
    } else if (e.keyCode === 8) {
      e.preventDefault();
      let prev = this.refs[field.name].previousSibling;
      if (prev && prev.classList.contains('character-blank')) {
        prev = this.refs[field.name].previousSibling.previousSibling;
      }
      if (prev && prev.tagName === "INPUT") {
        if (this.refs[field.name].value.length > 0) {
          const characterCopy = this.props.box.slice();
          characterCopy[field.name.split('character')[1]] = '';
          this.props.changeBoxCharacter(characterCopy);
          this.refs[field.name].value = '';
        } else {
          prev.focus();
        }
      }
      if (!prev) {
        this.refs[field.name].value = '';
      }
    }
  }

  render() {
    for (let x in this.refs) {
      this.refs[x].onkeydown = (e) =>
        this._handleKeyPress(e, this.refs[x]);
    }

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
                ref={`character${index}`}
              />)
        }
      </div>
    );
  }
}

export default CharacterBox;
