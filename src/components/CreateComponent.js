import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import CharacterBox from './CharacterBox'

class CreateComponent extends Component {
  constructor(props) {
    super(props);

    this.title = React.createRef();
    this.url = React.createRef();
    this.startTimeMin = React.createRef();
    this.startTimeSec = React.createRef();
    this.endTimeMin = React.createRef();
    this.endTimeSec = React.createRef();
    this.lyricsBox = React.createRef();

    this.state = {
      url: null,
      startTime: null,
      endTime: null,
      playing: false,
      lyricsBoxCount: 0,
      lyricsBox: []
    };
  }

  onYoutubeUrlValidation(url) {
    const regex = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;
    const validation = regex.test(url);
    if (validation) {
      return true;
    } else {
      return false;
    }
  }

  onMovieTestClick(e) {
    const title = this.title.current.value;
    const url = this.url.current.value;
    const startTime = Number(this.startTimeMin.current.value ? this.startTimeMin.current.value : 0) * 60 + Number(this.startTimeSec.current.value ? this.startTimeSec.current.value : 0);
    const endTime = Number(this.endTimeMin.current.value ? this.endTimeMin.current.value : 0) * 60 + Number(this.endTimeSec.current.value ? this.endTimeSec.current.value : 0);
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
    const startTime = Number(this.startTimeMin.current.value ? this.startTimeMin.current.value : 0) * 60 + Number(this.startTimeSec.current.value ? this.startTimeSec.current.value : 0);
    const endTime = Number(this.endTimeMin.current.value ? this.endTimeMin.current.value : 0) * 60 + Number(this.endTimeSec.current.value ? this.endTimeSec.current.value : 0);
    let lyrics = this.state.lyricsBox.slice();
    for (let i = lyrics.length - 1; i >= 0; i--) {
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
        <p className="create-desc">문제를 내고 싶은 영상을 등록해 주세요.</p>
        <div className="input-wrap">
          <label htmlFor="movieTitle">제목 : </label>
          <input type="text" id="movieTitle" name="movieTitle" ref={this.title} />
        </div>
        <div className="input-wrap">
          <label htmlFor="movieUrl">영상 링크 : </label>
          <input type="text" id="movieUrl" name="movieUrl" ref={this.url} />
        </div>
        <div className="input-wrap">
          <label>구간 시작 : </label>
          <div className="time-wrap">
            <input type="number" name="startTimeMin" id="startTimeMin" ref={this.startTimeMin} />
            <label htmlFor="startTimeMin">분</label>
            <input type="number" name="startTimeSec" id="startTimeSec" ref={this.startTimeSec} />
            <label htmlFor="startTimeSec">초</label>
          </div>
        </div>
        <div className="input-wrap">
          <label>구간 끝 : </label>
          <div className="time-wrap">
            <input type="number" name="endTimeMin" id="endTimeMin" ref={this.endTimeMin} />
            <label htmlFor="endTimeMin">분</label>
            <input type="number" name="endTimeSec" id="endTimeSec" ref={this.endTimeSec} />
            <label htmlFor="endTimeSec">초</label>
            <button className="btn-test" onClick={this.onMovieTestClick.bind(this)}>테스트</button>
          </div>
        </div>


        <div className="create-player">
          <ReactPlayer
            url={`${this.state.url}?start=${this.state.startTime}&end=${this.state.endTime}`}
            ref={player => { this.player = player }}
            playing={this.state.playing}
            width="100%"
            height="100%"
            youtubeConfig={{ playerVars: { rel: 0, fs: 1, modestbranding: 1, iv_load_policy: 3, showinfo: 0 } }}
          />
        </div>
        <h2>가사 등록</h2>
        <p className="create-lyrics-desc">하단 플러스 버튼 으로 가사 등록 칸을 생성하시고 가사를 등록해 주세요</p>
        <div className="create-lyrics">
          <div className="create-lyrics-wrap">
            <CharacterBox changeBoxCharacter={this.changeBoxCharacter.bind(this)} box={this.state.lyricsBox} />
          </div>
          <div className="create-lyrics-button-wrap">
            <button onClick={this.createProblemSubmit.bind(this)} className="btn-submit btn-left">Submit</button>
            <div className="btn-right">
              <button onClick={this.addLyricsBox.bind(this)}>+</button>
              <button onClick={this.removeLyricsBox.bind(this)}>-</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateComponent;