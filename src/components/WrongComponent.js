import React, { Component, Fragment } from 'react';
import ReactPlayer from 'react-player';

const YOUTUBE_SETTING_INIT = {
  link: null,
  lyrics: null,
  startTime: null,
  endTime: null,
  title: null,
  user: null,
  wrongAnswer: null,
  __v: null,
  _id: null
};

class WrongComponent extends Component {
  constructor(props) {
    super(props);
    window.onpopstate = () => {
      this.props.wrongPlayerChange(YOUTUBE_SETTING_INIT);
    }
  }

  componentDidMount() {
    this.props.getWrongAnswer();
  }

  onListClick(id, ev) {
    let youtubePromise = new Promise((resolve, reject) => {
      this.props.wrongPlayerChange(YOUTUBE_SETTING_INIT);
      const video = this.props.getProblem.filter(item => item._id === id);
      resolve(video);
    });
    youtubePromise.then((video) => {
      if (video.length > 0) {
        this.props.wrongPlayerChange(video[0]);
      } else {
        this.props.getProblemByWrong(id)
          .then((result) => {
            video = this.props.getProblem.filter(item => item._id === id);
            this.props.wrongPlayerChange(video[0]);
          });
      }
    });
  }

  onLikeClick(id) {
    if (!this.props.isLikeLoading) {
      this.props.likeButtonState(true);
      const _filter = this.props.getAnswers.filter(item => item._id === id)[0].liked;
      if (_filter.indexOf(this.props.uid) > -1) {
        this.props.userAnswerUnLike({
          uid: this.props.uid,
          answerId: id
        });
      } else {
        this.props.userAnswerLike({
          uid: this.props.uid,
          answerId: id
        });
      }
    }
  }

  render() {
    return (
      <Fragment>
        <div className="wrong-player-wrap" >
          {
            this.props.wrongPlayer &&
            <ReactPlayer
              url={`${this.props.wrongPlayer.link}?start=${this.props.wrongPlayer.startTime}&end=${this.props.wrongPlayer.endTime}`}
              ref={player => { this.player = player }}
              playing
              width="100%"
              height="100%"
              youtubeConfig={{ playerVars: { rel: 0, fs: 1, modestbranding: 1, iv_load_policy: 3, showinfo: 0, onPlaybackQualityChange: 'small' } }}
            />
          }
        </div>
        <div className="wrong-answer-wrap">
          <h2>Wrong Answer</h2>
          <div>
            <button onClick={() => {
              this.props.getWrongAnswer('date');
            }}>Date</button>
            <button onClick={() => {
              this.props.getWrongAnswer('like');
            }}>like</button>
          </div>
          <ul className="answer-list">
            {
              this.props.getAnswers.map((answer, index) => {
                return (
                  <li key={answer._id}>
                    <span>{index + 1}.</span>
                    <strong onClick={this.onListClick.bind(this, answer.problemId)}>{answer.answer}</strong>
                    <span>{answer.liked.indexOf(this.props.uid) > -1 ? 'heart' : 'hear breaker'}</span>
                    <button onClick={this.onLikeClick.bind(this, answer._id)}>{answer.liked.length} like</button>
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
