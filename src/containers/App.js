import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppComponent from '../components/AppComponent';
import firebase from '../services/firebase';
import axios from 'axios';

const BASE_URL = `http://localhost:5000`;
const POST_LOGIN = BASE_URL + `/users/login`;
const POST_CREATE_PROBLEM = BASE_URL + `/problems`;
const GET_PROBLEMS = BASE_URL + `/problems/random`; //query string ?limit=3

const listenStateToProps = (state) => {
  return {
    isLogin: state.isLogin,
    userToken: state.userToken,
    uid: state.uid,
    problems: state.problems,
    router: state.router,
    userLevel: state.userLevel,
    userLife: state.userLife
  };
};

const listenDispatchProps = (dispatch, ownProps) => {
  console.log(ownProps);
  return {
    onAuthStateChanged() {
      firebase
        .auth()
        .onAuthStateChanged((user) => {
          if (user) {
            this.onLoginAndImportToken(user.uid);
          } else {
            dispatch({ type: 'ON_USER_LOGOUT' });
          }
        });
    },
    onLoginAndImportToken(uid) {
      axios
        .post(POST_LOGIN, {
          uid: uid
        })
        .then((response) => {
          dispatch({ type: 'ON_USER_LOGIN', userToken: response.data.token, uid: uid });
        })
        .catch((err) => {
          alert('Login and import token failed')
          console.log(err);
        });
    },
    authenticateWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider();

      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          this.onLoginAndImportToken(result.user.uid);
        })
        .catch((err) => {
          alert('Login failed');
          console.log(err);
        });
    },
    onUserLogoutAction() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          dispatch({ type: 'ON_USER_LOGOUT' });
        })
        .catch((err) => {
          alert('Logout failed');
          console.log(err);
        });
    },
    createProblemSubmit(data) {
      axios({
        url: POST_CREATE_PROBLEM,
        method: 'post',
        data: data,
        headers: {
          'authorization': "Bearer " + data.token
        }
      })
        .catch((err) => {
          alert('Problem creation failed');
          console.log(err);
        });
    },
    getProblems(token) {
      return axios({
        url: GET_PROBLEMS,
        method: 'get',
        headers: {
          'authorization': "Bearer " + token
        }
      })
        .then((reponse) => {
          console.log(ownProps);
          dispatch({ type: 'USER_STATE_INIT'});
          dispatch({ type: 'GET_PROBLEMS', problems: reponse.data.result});
        })
        .then(() => {
          ownProps.history.push('/problem');
        })
        .catch((err) => {
          // dispatch error
          alert('Problem get failed');
          console.log(err);
        });
    },
    sendProblem() {

    },
    userLevelUp() {
      dispatch({ type: 'USER_LEVEL_UP'});
    },
    userLifeState(life) {
      dispatch({ type: 'USER_LIFE_STATE', life});
    }
  }
}

export default connect(listenStateToProps, listenDispatchProps)(AppComponent);
