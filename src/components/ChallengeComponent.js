import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ReactPlayer from 'react-player';
import AnswerBox from './AnswerBox';
import LifeStateComponent from './LifeStateComponent';

class ChallengeComponent extends Component {
  constructor(props) {
    super(props);
    // this.props.problems[this.props.level] = this.props.problems[this.props.level];
    console.log(this.props);
    this.state = {
      character: this.props.problems[this.props.level].lyrics.split(''),
      userAnswer: this.props.problems[this.props.level].lyrics.split('').map(box => " "),
      wrong: [], // redux
      // point: 0, // redux
      // life: this.props.life, // redux
      isHint: false,
      isDone: false,
      isSuccess: false,
      isFailed: false,
      isLevel: this.props.level
    };
  }

  onAnswerSubmit() {
    if (this.state.userAnswer.join("") === this.props.problems[this.props.level].lyrics) {
      this.setState({
        isSuccess: true
      });

    } else {
      let wrongCopy = this.state.wrong.slice();
      wrongCopy.push(this.state.userAnswer.join(""));
      this.props.userLifeState(this.props.life === 0 ? this.props.life : this.props.life - 1);
      this.setState({
        wrong: wrongCopy,
      }, function () {
        if (this.props.life === 0) {
          this.setState({
            isFailed: true
          });
        }
      });
    }
  }

  onHintClick() {
    if (this.props.life !== 0) {
      this.setState({
        isHint: true
      });
    }
  }

  //test

  onHintOpenOrCancel(ev) {
    if (this.state.isHint) {
      const userAnswerCopy = this.state.userAnswer.slice();
      if (ev.target.classList.contains('character-box') && this.props.life > 0) {
        const target = ev.target.name.split('character')[1];
        userAnswerCopy[target] = this.state.character[target];
        ev.target.value = this.state.character[target];
        this.props.userLifeState(this.props.life === 0 ? this.props.life : this.props.life - 1);
        this.setState({
          userAnswer: userAnswerCopy
        });
      }
      this.setState({
        isHint: false
      });
    }
  }

  render() {
    console.log(this.state);
    return (
      <div className="challenge-wrap" onClick={this.onHintOpenOrCancel.bind(this)}>
        <h2>{this.props.problems[this.props.level].title}</h2>
        <div className="create-player">
          <ReactPlayer
            url={this.props.problems[this.props.level].link}
            ref={player => { this.player = player }}
            playing
            width="100%"
            height="100%"
            // controls
            youtubeConfig={
              {
                playerVars: {
                  start: this.props.problems[this.props.level].startTime,
                  end: this.props.problems[this.props.level].endTime,
                  rel: 0,
                  fs: 1,
                  modestbranding: 1,
                  iv_load_policy: 3
                }
              }
            }
            onEnded={() => {
              this.player.seekTo(this.props.problems[this.props.level].startTime);
            }}
          />
        </div>
        <div className="status-bar">
          <LifeStateComponent life={this.props.life} />
          <button onClick={this.onHintClick.bind(this)} className={this.state.isHint ? 'now-hint' : ''}>Hint</button>
        </div>
        <p>{this.props.problems[this.props.level].lyrics}</p>
        <div className="create-lyrics">
          <div className={this.state.isHint ? 'create-lyrics-wrap create-lyrics-wrap-hint' : 'create-lyrics-wrap'} >
            <AnswerBox character={this.state.character} userAnswer={this.state.userAnswer} />
          </div>
        </div>
        <button onClick={this.onAnswerSubmit.bind(this)}>제출</button>
        <Route path="/problem" render={() => {
          if (this.state.isSuccess) {
            return (
            <div className="popup">
              <h3 className="popup-title">Go Next Level</h3>
              <span className="popup-point">Point!!</span>
              <button className="popup-button" onClick={() => {
                this.props.userLevelUp();
                console.log(this.props.level);
                this.setState({
                  isSuccess: false,
                  character: this.props.problems[1].lyrics.split(''),
                  userAnswer: this.props.problems[1].lyrics.split('').map(box => " "),
                });
              }}>Go Next Level</button>
            </div>)
          } else if (this.state.isFailed) {
            return (
            <div className="popup">
              <strong className="popup-title">OMG_you failed...</strong>
              <span className="popup-point">Point!!</span>
              <button>Go Home</button>
            </div>)
          } else if (this.state.isDone) {
            return (
              <div className="popup">
                <strong className="popup-title">Congratulation</strong>
                <span className="popup-point">Point!!</span>
                <button>Go Home</button>
              </div>)
          } else {
            return <div></div>
          }
        }}/>
      </div>
    )
  }
}

export default ChallengeComponent;
