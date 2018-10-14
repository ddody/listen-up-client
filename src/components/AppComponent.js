import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import ReactPlayer from 'react-player'
import Navbar from './Navbar';
import LoginComponent from './LoginComponent';
import CreateComponent from './CreateComponent';
import ChallengeComponent from './ChallengeComponent';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.createProblemSubmit = this.createProblemSubmit.bind(this);
  }

  componentDidMount() {
    this.props.onAuthStateChanged();
  }

  createProblemSubmit(data) {
    data.uid = this.props.uid;
    data.token = this.props.userToken;
    this.props.createProblemSubmit(data);
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
                onChallengeClick={this.props.getProblems}
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
            if (this.props.userToken) {
              return (
                <ChallengeComponent
                  {...props}
                  getProblems={this.getProblems}
                  userLifeState={this.props.userLifeState}
                  userPointSrate={this.props.userPointSrate}
                  userLevelUp={this.props.userLevelUp}
                  problems={this.props.problems}
                  level={this.props.userLevel}
                  life={this.props.userLife}
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
