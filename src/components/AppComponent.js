import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import ReactPlayer from 'react-player'
import Navbar from './Navbar';
import LoginComponent from './LoginComponent';
import CreateComponent from './CreateComponent';
import Challenge from '../containers/ChallengeContainer';
import Ranking from '../containers/RankingContainer';
import WrongAnswer from '../containers/WrongContainer';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.createProblemSubmit = this.createProblemSubmit.bind(this);
    this.getGameProblems = this.getGameProblems.bind(this);
  }

  componentDidMount() {
    this.props.onAuthStateChanged();
  }

  createProblemSubmit(data) {
    data.uid = this.props.uid;
    data.token = this.props.token;
    this.props.createProblemSubmit(data);
  }

  getGameProblems() {
    this.props.getGameProblems(this.props.token);
  }

  render() {
    return (
      <div className="container">
        <Navbar
          onUserLogout={this.props.onUserLogoutAction.bind(this)}
          token={this.props.token}
        />
        <Route path="/" exact render={() => {
          return (
            <Fragment>
              <LoginComponent
                onChallengeClick={this.getGameProblems}
                token={this.props.token}
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
                  youtubeConfig={{ playerVars: { rel: 0, fs: 1, modestbranding: 1, iv_load_policy: 3, cc_load_policy: 3 } }}
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
            if (this.props.token) {
              return (
                <Challenge
                  {...props}
                  token={this.props.token}
                  uid={this.props.uid}
                />
              )
            } else {
              return <Redirect to="/" />
            }
          }} />
          <Route path="/create" render={() => {
            if (this.props.token) {
              return <CreateComponent createProblemSubmit={this.createProblemSubmit.bind(this)} />
            } else {
              return <Redirect to="/" />
            }
          }} />
          <Route path="/ranking" render={() => {
            if (this.props.token) {
              return <Ranking token={this.props.token} />
            } else {
              return <Redirect to="/" />
            }
          }} />
          <Route path="/wrong-answer" render={() => {
            if (this.props.token) {
              return (
                <WrongAnswer
                  token={this.props.token}
                  uid={this.props.uid}
                />
              )
            } else {
              return <Redirect to="/" />
            }
          }} />
        </Switch>
      </div>
    );
  }
}

export default App;
