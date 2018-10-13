import React, { Component } from 'react';
import AnswerBox from './AnswerBox';
import ReactPlayer from 'react-player';
import LifeStateComponent from './LifeStateComponent';

class ChallengeComponent extends Component {
  constructor(props) {
    super(props);
    this.nowProblems = this.props.problems[this.props.level];
    console.log(this.nowProblems);
    this.state = {
      character: this.nowProblems.lyrics.split(''),
      userAnswer: this.nowProblems.lyrics.split('').map(box => " "),
      wrong: [],
      point: 0,
      life: this.props.life,
    }
  }

  onAnswerSubmit() {
    if (this.state.userAnswer.join("") === this.nowProblems.lyrics) {
      this.props.userLifeState(this.state.life);

      alert('collect');
    } else {
      let wrongCopy = this.state.wrong.slice();
      wrongCopy.push(this.state.userAnswer.join(""));
      this.setState({
        wrong: wrongCopy,
        life: this.state.life === 0 ? this.state.life : this.state.life - 1
      }, function () {
        if (this.state.life === 0) {
          this.props.history.push('/');
        }
      });
    }
  }

  render() {
    return (
      <div className="challenge-wrap">
        <h2>{this.nowProblems.title}</h2>
        <div className="create-player">
          <ReactPlayer
            url={this.nowProblems.link}
            ref={player => { this.player = player }}
            playing
            width="100%"
            height="100%"
            // controls
            youtubeConfig={
              {
                playerVars: {
                  start: this.nowProblems.startTime,
                  end: this.nowProblems.endTime,
                  rel: 0,
                  fs: 1,
                  modestbranding: 1,
                  iv_load_policy: 3
                }
              }
            }
            onEnded={() => {
              this.player.seekTo(this.nowProblems.startTime);
            }}
          />
        </div>
        <div className="status-bar">
          <LifeStateComponent life={this.state.life} />
        </div>
        <p>{this.nowProblems.lyrics}</p>
        <div className="create-lyrics">
          <div className="create-lyrics-wrap">
            <AnswerBox character={this.state.character} userAnswer={this.state.userAnswer} />
          </div>
        </div>
        <button onClick={this.onAnswerSubmit.bind(this)}>제출</button>
      </div>
    )
  }
}

export default ChallengeComponent;
