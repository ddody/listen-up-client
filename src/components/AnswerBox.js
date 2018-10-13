import React, { Component } from 'react';

class AnswerBox extends Component {
  constructor(props) {
    super(props);

    this._handleKeyPress = this._handleKeyPress.bind(this);
  }

  inputChange(ev) {
    this.props.userAnswer[ev.target.name.split('character')[1]] = ev.target.value === '' ? ' ' : ev.target.value;
  }

  componentDidMount() {
    for (let x in this.refs) {
      this.refs[x].onkeydown = (e) =>
        this._handleKeyPress(e, this.refs[x]);
    }
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
      if (!next) {
        console.log('제출');
      }
    } else if (e.keyCode === 8) {
      e.preventDefault();
      let prev = this.refs[field.name].previousSibling;
      if (prev && prev.classList.contains('character-blank')) {
        prev = this.refs[field.name].previousSibling.previousSibling;
      }
      if (prev && prev.tagName === "INPUT") {
        if (this.refs[field.name].value.length > 0) {
          this.props.userAnswer[field.name.split('character')[1]] = '';
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
    return (
      <div>
        {
          this.props.character.map(
            (box, index) => {
              if (box === ' ') {
                return (
                  <input
                    type="text"
                    key={index}
                    tabIndex="-1"
                    name={`character${index}`}
                    className="character-blank"
                    disabled
                    ref={`character${index}`}
                  />
                )
              } else {
                return (
                  <input
                    type="text"
                    key={index}
                    maxLength="1"
                    name={`character${index}`}
                    onChange={this.inputChange.bind(this)}
                    className="character-box"
                    ref={`character${index}`}
                  />);
              }
            }
          )
        }
      </div>
    );
  }
}

export default AnswerBox;
