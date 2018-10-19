import React, { Component, Fragment } from 'react';
import ReactPlayer from 'react-player';
import debounce from 'lodash.debounce';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const YOUTUBE_SETTING_INIT = {
  link: null,
  startTime: null,
  endTime: null,
};

class WrongComponent extends Component {
  constructor(props) {
    super(props);
    window.onpopstate = () => {
      this.props.wrongPlayerChange(YOUTUBE_SETTING_INIT);
    }

    this.onListClick = debounce(this.onListClick, 400);
  }

  componentDidMount() {
    this.props.getWrongAnswer();
  }

  onListClick(id, ev) {
    this.props.wrongPlayerChange(YOUTUBE_SETTING_INIT);
    this.props.getProblemByWrong(id)
      .then((result) => {
        this.props.wrongPlayerChange({
          link: result.link,
          startTime: result.startTime,
          endTime: result.endTime
        });
      });
  }

  onLikeClick(id, ev) {
    if (!this.props.isLikeLoading) {
      this.props.likeButtonState(true);
      const _filter = this.props.allWrongAnswers.filter(item => item._id === id)[0].liked;
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
            this.props.currentYoutubePlayer &&
            <ReactPlayer
              url={`${this.props.currentYoutubePlayer.link}?start=${this.props.currentYoutubePlayer.startTime}&end=${this.props.currentYoutubePlayer.endTime}`}
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
          <p className="wrong-answer-desc">
            오답을 클릭 하면 해당 클립을 시청 하실 수 있습니다.
          </p>
          <div className="sort-wrap">
            <strong>sort : </strong>
            <button onClick={() => {
              this.props.getWrongAnswer('date');
            }}>Date</button>
            <button onClick={() => {
              this.props.getWrongAnswer('like');
            }}>like</button>
          </div>
          <ul className="answer-list">
            {
              this.props.allWrongAnswers.map((answer, index) => {
                return (
                  <li key={answer._id}>
                    <span className="answer-number">{index + 1}.</span>
                    <strong className="answer-name" onClick={this.onListClick.bind(this, answer.problemId)}>{answer.answer}</strong>
                    <button
                      className="answer-heart"
                      onClick={this.onLikeClick.bind(this, answer._id)}>
                      {
                        this.props.isLikeLoading ?
                          answer.active ?
                            <FontAwesomeIcon
                              icon={['fa', 'spinner']}
                              style={{ color: '#aa7' }}
                              spin
                            /> : answer.liked.indexOf(this.props.uid) > -1 ?
                              <FontAwesomeIcon
                                icon="heart"
                                style={{ color: '#f00' }}
                              /> :
                              <FontAwesomeIcon
                                icon={['far', 'heart']}
                                style={{ color: '#f00' }}
                              /> :
                          answer.liked.indexOf(this.props.uid) > -1 ?
                            <FontAwesomeIcon
                              icon="heart"
                              style={{ color: '#f00' }}
                            /> :
                            <FontAwesomeIcon
                              icon={['far', 'heart']}
                              style={{ color: '#f00' }}
                            />
                      }
                    </button>
                    <span className="answer-like">
                      {answer.liked.length} like
                    </span>
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
