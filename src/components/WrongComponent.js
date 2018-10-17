import React, { Component, Fragment } from 'react';
import ReactPlayer from 'react-player';

class WrongComponent extends Component {
  componentDidMount() {
    this.props.getWrongAnswer();
  }

  onListclick(id) {
    let video;
    if (this.props.getProblem.filter(item => item._id === id).length > 0) {
      video = this.props.getProblem.filter(item => item._id === id);
      this.props.wrongPlayerChange(video[0]);
    } else {
      this.props.getProblemByWrong(id)
        .then((result) => {
          video = this.props.getProblem.filter(item => item._id === id);
          console.log(video);
          this.props.wrongPlayerChange(video[0]);
          console.log(this.props.wrongPlayer);
        });
    }
  }

  render() {
    return (
      <Fragment>
        {this.props.wrongPlayer &&
          <ReactPlayer
            url={`${this.props.wrongPlayer.link}?start=${this.props.wrongPlayer.startTime}&end=${this.props.wrongPlayer.endTime}`}
            ref={player => { this.player = player }}
            playing={true}
            width="100%"
            height="100%"
            youtubeConfig={{ playerVars: { rel: 0, fs: 1, modestbranding: 1, iv_load_policy: 3, showinfo: 0 } }}
            onEnded={() => {
              console.log(this.player.props);
              console.log(this.player.url);
              // this.player.props.url = "";
            }}
          />
        }
        <div className="wrong-answer-wrap">
          <h2>Wrong Answer</h2>
          <ul className="answer-list">
            {
              this.props.getAnswers.map((answer, index) => {
                return (
                  <li key={answer._id} onClick={this.onListclick.bind(this, answer.problemId)}>
                    <span>number</span>
                    <strong>{answer.answer}</strong>
                    <span>like</span>
                  </li>
                );
              })
            }
          </ul>
        </div>
      </Fragment>
    );
  };
}

export default WrongComponent;
