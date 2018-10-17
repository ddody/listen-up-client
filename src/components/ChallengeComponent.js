import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import ReactPlayer from 'react-player';
import AnswerBox from './AnswerBox';
import LifeStateComponent from './LifeStateComponent';

class ChallengeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: true
    };

    window.onpopstate = (e) => {
      this.props.problemInitialize();
    }
  }

  onAnswerSubmit() {
    this.props.saveWrongAnswer();
    if (this.props.problem.userAnswer.join("") === this.props.problem.lyrics) {
      this.props.userPloblemSolved(true);
    } else {
      this.props.userLifeState(this.props.life === 0 ? this.props.life : this.props.life - 1);
      if (this.props.life === 0) {
        this.props.userPloblemSolved(false);
      }
    }
  }

  onHintClick() {
    if (this.props.life !== 0) {
      this.props.userHintState(true);
    }
  }

  onProblemLoadInit() {
    this.props.userLevelClear(false);
  }

  onGoHomeClick() {
    this.props.sendSelectAnswer();
    this.props.userPloblemSolved(null);
  }

  onHintOpenOrCancel(ev) {
    if (this.props.isHint) {
      if (ev.target.classList.contains('character-box') && this.props.life > 0) {
        const nowProblem = this.props.problem
        const userAnswerCopy = nowProblem.userAnswer.slice();
        const target = ev.target.name.split('character')[1];
        userAnswerCopy[target] = nowProblem.lyrics.split("")[target];
        ev.target.value = nowProblem.lyrics.split("")[target];
        this.props.userAnswerCheck(userAnswerCopy);
        this.props.userLifeState(this.props.life === 0 ? this.props.life : this.props.life - 1);
      }
      this.props.userHintState(false);
    }
  }

  onMoreListenClick() {
    if (this.props.life > 0) {
      this.setState({
        playing: true,
      }, () => {
        this.props.userLifeState(this.props.life === 0 ? this.props.life : this.props.life - 1);
        this.player.seekTo(this.props.problem.startTime);
      });
    }
  }

  render() {
    return (
      <div className="challenge-wrap" onClick={this.onHintOpenOrCancel.bind(this)}>
        <h2>{this.props.problem.title}</h2>
        <div className="create-player">
          <ReactPlayer
            url={`${this.props.problem.link}?start=${this.props.problem.startTime}&end=${this.props.problem.endTime}`}
            ref={player => { this.player = player }}
            playing={this.state.playing}
            width="100%"
            height="100%"
            youtubeConfig={{ playerVars: { rel: 0, fs: 1, modestbranding: 1, iv_load_policy: 3, showinfo: 0 } }}
          />
        </div>
        <div className="status-bar">
          <div className="life-wrap">
            <LifeStateComponent life={this.props.life} />
          </div>
          <div className="status-button-wrap">
            <button onClick={this.onHintClick.bind(this)} className={this.props.isHint ? 'now-hint' : ''}>Hint</button>
            <button onClick={this.onMoreListenClick.bind(this)}>One More Listen</button>
          </div>
        </div>
        <div className="create-lyrics">
          <div className={this.props.isHint ? 'create-lyrics-wrap create-lyrics-wrap-hint' : 'create-lyrics-wrap'} >
            <AnswerBox
              character={this.props.problem.lyrics}
              userAnswer={this.props.problem.userAnswer}
              userAnswerCheck={this.props.userAnswerCheck}
              isClear={this.props.isClear}
              onProblemLoadInit={this.onProblemLoadInit.bind(this)}
            />
          </div>
        </div>
        <button className="answer-submit" onClick={this.onAnswerSubmit.bind(this)}>제출</button>
        <Route path="/problem" render={() => {
          if (this.props.isSolved === true) {
            if (this.props.problemsCount === this.props.level) {
              return (
                <div className="popup">
                  <strong className="popup-title">Congratulation</strong>
                  <span className="popup-point">Point!!</span>
                  <button onClick={() => {
                    this.onGoHomeClick.bind(this);
                    this.props.userPloblemSolved(null);
                    this.props.sendProblemPoint();
                  }}>Go Home</button>
                </div>);
            } else {
              return (
                <div className="popup">
                  <h3 className="popup-title">Go Next Level</h3>
                  <span className="popup-point">Point!!</span>
                  <button className="popup-button" onClick={() => {
                    this.props.userPloblemSolved(null);
                    this.props.userLevelUp();
                    this.props.userLevelClear(true);
                    this.setState({
                      playing: true
                    });
                  }}>Go Next Level</button>
                </div>);
            }
          } else if (this.props.isSolved === false) {
            return (
              <div className="popup">
                <strong className="popup-title">OMG_you failed...</strong>
                <ul className="wrong-answer-list">
                  {
                    this.props.wrongAnswers.map((item, index) => {
                      return (
                        <li key={index}>
                          <input type="radio" data-index={`${index}`} id={`wrong${index}`} name="wrong" onChange={() => { this.props.selectAnswerNumber(index) }} />
                          <label htmlFor={`wrong${index}`}>{item.answer}</label>
                        </li>
                      );
                    })
                  }
                </ul>
                <button onClick={this.onGoHomeClick.bind(this)}>Go Home</button>
              </div>);
          } else {
            return null;
          }
        }} />
      </div>
    )
  }
}

export default ChallengeComponent;
