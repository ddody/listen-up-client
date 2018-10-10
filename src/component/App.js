import React, { Component } from 'react';
import firebase from '../services/firebase';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: false,
      userToken: ''
    }
  }

  componentDidCatch(error, info) {
    console.log(error);
  }

  componentDidMount() {
    firebase
      .auth()
      .onAuthStateChanged((user) => {
        console.log(user);
        if (user) {
          axios
            .post(`http://localhost:5000/users/login`, {
              uid: user.uid
            })
            .then((response) => {
              console.log(response);
              this.setState({
                isLogin: true,
                userToken: response.data.token
              });
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          this.setState({
            isLogin: false,
            userToken: null
          });
        }
        console.log(this.state);
      });
  }

  onUserLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result);
        axios
          .post(`http://localhost:5000/users/login`, {
            uid: result.user.uid
          })
          .then((response) => {
            console.log(response);
            this.setState({
              isLogin: true,
              userToken: response.data.token
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onUserLogout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.setState({
          isLogin: false,
          userToken: null
        });
        console.log(this.state);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="App">
        <div>
          <button onClick={this.onUserLogin.bind(this)}>Login</button>
          <button onClick={this.onUserLogout.bind(this)}>Logout</button>
        </div>
        <div>
          <h1>home</h1>
        </div>
      </div>
    );
  }
}

export default App;
