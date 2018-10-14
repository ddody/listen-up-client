import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import CharacterBox from './CharacterBox'

class CreateComponent extends Component {
  constructor(props) {
    super(props);

    this.title = React.createRef();
    this.url = React.createRef();
    this.startTime = React.createRef();
    this.endTime = React.createRef();
    this.lyricsBox = React.createRef();

    this.state = {
      url: '',
      startTime: null,
      endTime: null,
      playing: false,
      lyricsBoxCount: 0,
      lyricsBox: []
    };
  }

  onYoutubeUrlValidation(url) {
    const validation = url.match(/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/);
    if (validation) {
      return true;
    } else {
      return false;
    }
  }

  onMovieTestClick(e) {
    const title = this.title.current.value;
    const url = this.url.current.value;
    const startTime = this.startTime.current.value;
    const endTime = this.endTime.current.value;
    if (url === '' || startTime === '' || endTime === '' || title === '') {
      alert('Please fill in all fields');
    } else {
      if (this.onYoutubeUrlValidation(url)) {
        this.setState({
          url: null,
        }, function () {
          this.setState({
            url,
            startTime,
            endTime,
            playing: true
          });
        });
      } else {
        alert('Incorrect url');
      }
    }
  }

  addLyricsBox() {
    this.setState({
      lyricsBoxCount: this.state.lyricsBoxCount + 1
    }, function () {
      let lyricsBoxCopy = this.state.lyricsBox.slice();
      lyricsBoxCopy.push("");
      this.setState({
        lyricsBox: lyricsBoxCopy
      })
    });
  }

  removeLyricsBox() {
    this.setState({
      lyricsBoxCount: this.state.lyricsBoxCount === 0 ? this.state.lyricsBoxCount : this.state.lyricsBoxCount - 1
    }, function () {
      let lyricsBoxCopy = this.state.lyricsBox.slice();
      lyricsBoxCopy.pop("");
      this.setState({
        lyricsBox: lyricsBoxCopy
      })
    });
  }

  createProblemSubmit() {
    const link = this.url.current.value;
    const startTime = parseInt(this.startTime.current.value);
    const endTime = parseInt(this.endTime.current.value);
    let lyrics = this.state.lyricsBox.slice();
    for (let i = lyrics.length - 1; i >= 0 ; i--) {
      if (lyrics[i] === '' || lyrics[i] === ' ') {
        lyrics.pop();
      } else {
        break;
      }
    }
    for (let i = 0; i < lyrics.length; i++) {
      if (lyrics[i] === '') {
        lyrics[i] = ' ';
      }
    }
    lyrics = lyrics.join("");
    const title = this.title.current.value;
    this.props.createProblemSubmit({ link, startTime, endTime, lyrics, title });
  }

  changeBoxCharacter(box) {
    this.setState({
      lyricsBox: box
    });
  }

  render() {
    return (
      <div className="create-wrap">
        <h2>영상등록</h2>
        <p className="create-desc">영상은 이래이래이래해서 이래해야해요</p>
        <div className="input-wrap">
          <label htmlFor="movieTitle">제목 : </label>
          <input type="text" id="movieTitle" name="movieTitle" ref={this.title}/>
        </div>
        <div className="input-wrap">
          <label htmlFor="movieUrl">영상 링크 : </label>
          <input type="text" id="movieUrl" name="movieUrl" ref={this.url}/>
        </div>
        <div className="input-wrap">
          <label htmlFor="startTime">구간 시작 : </label>
          <input type="number" id="startTime" name="startTime" ref={this.startTime}/>
        </div>
        <div className="input-wrap">
          <label htmlFor="endTime">구간 끝 : </label>
          <input type="number" id="endTime" name="endTime" ref={this.endTime}/>
        </div>
        <button onClick={this.onMovieTestClick.bind(this)}>테스트</button>

        <div className="create-player">
          <ReactPlayer
            url={this.state.url}
            ref={player => { this.player = player }}
            playing={this.state.playing}
            width="100%"
            height="100%"
            // controls
            youtubeConfig={
              {
                playerVars: {
                  start: this.state.startTime,
                  end: this.state.endTime,
                  rel: 0,
                  fs: 1,
                  modestbranding: 1,
                  iv_load_policy: 3
                }
              }
            }
            onEnded={() => {
              this.player.seekTo(this.state.startTime);
            }}
          />
        </div>
        <h2>가사 등록</h2>
        <p>가사를 등록해야해요</p>
        <div className="create-lyrics">
          <div className="create-lyrics-wrap">
            <CharacterBox changeBoxCharacter={this.changeBoxCharacter.bind(this)} box={this.state.lyricsBox} />
          </div>
          <button onClick={this.addLyricsBox.bind(this)}>+</button>
          <button onClick={this.removeLyricsBox.bind(this)}>-</button>
        </div>
        <button onClick={this.createProblemSubmit.bind(this)}>submit</button>
      </div>

    );
  }
}

export default CreateComponent;