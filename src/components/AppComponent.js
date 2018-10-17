import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import ReactPlayer from 'react-player'
import Navbar from './Navbar';
import LoginComponent from './LoginComponent';
import CreateComponent from './CreateComponent';
import ChallengeComponent from './ChallengeComponent';
import Ranking from '../containers/Ranking';
import WrongAnswer from '../containers/WrongAnswer';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.createProblemSubmit = this.createProblemSubmit.bind(this);
    this.sendProblemPoint = this.sendProblemPoint.bind(this);
    this.getProblems = this.getProblems.bind(this);
    this.sendSelectAnswer = this.sendSelectAnswer.bind(this);
  }

  componentDidMount() {
    this.props.onAuthStateChanged();
  }

  createProblemSubmit(data) {
    data.uid = this.props.uid;
    data.token = this.props.userToken;
    this.props.createProblemSubmit(data);
  }

  sendProblemPoint() {
    this.props.sendProblemPoint({
      uid: this.props.uid,
      token: this.props.userToken,
      life: this.props.userLife
    });
  }

  sendSelectAnswer() {
    this.props.sendSelectAnswer({
      uid: this.props.uid,
      token: this.props.userToken,
      wrongArr: this.props.wrongAnswer[this.props.wrongSelectNumber]
    });
  }

  getProblems() {
    this.props.getProblems(this.props.userToken);
  }


  render() {
    return (
      <div className="container">
        <Navbar
          onUserLogout={this.props.onUserLogoutAction.bind(this)}
          isLogin={this.props.isLogin}
        />
        <Route path="/" exact render={() => {
          return (
            <Fragment>
              <LoginComponent
                onChallengeClick={this.getProblems}
                isLogin={this.props.isLogin}
                onLoginClick={this.props.authenticateWithGoogle.bind(this)}
              />
              <div className="background">
                <ReactPlayer
                  url="https://www.youtube.com/watch?v=vecSVX1QYbQ"
                  ref={player => { this.player = player }}
                  width="100%"
                  height="100%"
                  volume={0.3}
                  playing
                  youtubeConfig={{ playerVars: { rel: 0, fs: 1, modestbranding: 1, iv_load_policy: 3 } }}
                  onEnded={() => {
                    this.player.seekTo(0);
                  }}
                />
              </div>
            </Fragment>
          );
        }} />
        <Switch>
          <Route path="/problem" render={(props) => {
            if (this.props.isLogin) {
              return (
                <ChallengeComponent
                  {...props}
                  userLifeState={this.props.userLifeState}
                  userPointState={this.props.userPointState}
                  userLevelUp={this.props.userLevelUp}
                  sendProblemPoint={this.sendProblemPoint}
                  userAnswerCheck={this.props.userAnswerCheck}
                  problemsCount={this.props.problems.length}
                  problem={this.props.problem}
                  level={this.props.userLevel}
                  life={this.props.userLife}
                  userPloblemSolved={this.props.userPloblemSolved}
                  userLevelClear={this.props.userLevelClear}
                  userHintState={this.props.userHintState}
                  isSolved={this.props.isSolved}
                  isClear={this.props.isClear}
                  isHint={this.props.isHint}
                  problemInitialize={this.props.problemInitialize}
                  saveWrongAnswer={this.props.saveWrongAnswer}
                  wrongAnswers={this.props.wrongAnswer}
                  sendSelectAnswer={this.sendSelectAnswer}
                  selectAnswerNumber={this.props.selectAnswerNumber}
                  wrongSelectNumber={this.props.wrongSelectNumber}
                />
              )
            } else {
              return <Redirect to="/" />
            }
          }} />
          <Route path="/create" render={() => {
            if (this.props.isLogin) {
              return <CreateComponent createProblemSubmit={this.createProblemSubmit.bind(this)}/>
            } else {
              return <Redirect to="/" />
            }
          }} />
          <Route path="/ranking" render={() => {
            if (this.props.isLogin) {
              return <Ranking token={this.props.userToken} />
            } else {
              return <Redirect to="/" />
            }
          }} />
          <Route path="/wrong-answer" render={() => {
            if (this.props.isLogin) {
              return (
                <WrongAnswer
                  token={this.props.userToken}
                  getProblem={this.props.getProblem}
                  wrongPlayer={this.props.wrongPlayer}
                />
              )
            } else {
              return <Redirect to="/" />
            }
          }} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    );
  }
}

const NoMatch = (props) => {
  return <div>{props.location.pathname} not Found</div>
}

export default App;
