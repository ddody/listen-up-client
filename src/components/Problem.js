<h2>{problem.title}</h2>
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