import React, { Component, Fragment } from 'react';

class AnswerBox extends Component {
  constructor(props) {
    super(props);
    this._handleKeyPress = this._handleKeyPress.bind(this);
  }

  inputChange(ev) {
    let inputAnswerCopy = this.props.userAnswer.slice();
    inputAnswerCopy[ev.target.name.split('character')[1]] = ev.target.value === '' ? ' ' : ev.target.value;
    this.props.userAnswerCheck(inputAnswerCopy);
  }

  componentDidMount() {
    this.addInputsHandler();
    this.refs['character0'].focus();
  }

  componentDidUpdate() {
    if (this.props.isClear) {
      this.addInputsHandler();
      this.props.onProblemLoadInit();
      this.refs['character0'].focus();
    }
  }

  addInputsHandler() {
    for (let x in this.refs) {
      this.refs[x].value = '';
      this.refs[x].onkeydown = (e) => {
        this._handleKeyPress(e, this.refs[x]);
      }
    }
  }

  _handleKeyPress(e, field) {
    if (this.props.isLastHint) {
      setTimeout(() => {
        this.props.userAnswer.map((item, index) => {
          if (this.props.character[index] !== item) {
            this.refs[`character${index}`].classList.add('invalid');
          } else {
            this.refs[`character${index}`].classList.remove('invalid');
          }
        });
      }, 100);
    }
    if (e.keyCode === 32) {
      e.preventDefault();
      let next = this.refs[field.name].nextSibling;
      if (next && next.classList.contains('character-blank')) {
        next = this.refs[field.name].nextSibling.nextSibling;
      }
      if (next && next.tagName === "INPUT") {
        next.focus();
      }
      // if (!next) {
      //   console.log('제출');
      // }
    } else if (e.keyCode === 8) {
      e.preventDefault();
      let prev = this.refs[field.name].previousSibling;
      if (prev && prev.classList.contains('character-blank')) {
        prev = this.refs[field.name].previousSibling.previousSibling;
      }
      if (prev && prev.tagName === "INPUT") {
        if (this.refs[field.name].value.length > 0) {
          let inputAnswerCopy = this.props.userAnswer.slice();
          inputAnswerCopy[field.name.split('character')[1]] = '';
          this.props.userAnswerCheck(inputAnswerCopy);
          this.refs[field.name].value = '';
        } else {
          prev.focus();
        }
      }
      if (!prev) {
        this.refs[field.name].value = '';
        let inputAnswerCopy = this.props.userAnswer.slice();
        inputAnswerCopy[field.name.split('character')[1]] = this.refs[field.name].value === '' ? ' ' : this.refs[field.name].value;
        this.props.userAnswerCheck(inputAnswerCopy);
      }
    }
  }

  render() {
    return (
      <Fragment>
        {
          this.props.character.split('').map(
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
      </Fragment>
    );
  }
}

export default AnswerBox;
