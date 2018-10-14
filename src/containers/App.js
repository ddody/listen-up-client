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
    userLife: state.userLife,
    userPoint: state.userPoint,
    nowProblems: state.nowProblems
  };
};

const listenDispatchProps = (dispatch, ownProps) => {
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
          this.props.onLoginAndImportToken(result.user.uid);
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
        .then(() => {
          alert('Submit success');
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
          dispatch({ type: 'USER_STATE_INIT' });
          dispatch({ type: 'GET_PROBLEMS', problems: reponse.data.result });
        })
        .then(() => {
          ownProps.history.push('/problem/round1');
        })
        .catch((err) => {
          // add dispatch error
          alert('Problem get failed');
          console.log(err);
        });
    },
    sendProblem(data) {
      axios({
        url: BASE_URL + data.uid + `/points`,
        method: 'post',
        data: data,
        headers: {
          'authorization': "Bearer " + data.token
        }
      })
        .then(() => {
          alert('Point add success');
        })
        .catch((err) => {
          alert('Problem creation failed');
          console.log(err);
        });
    },
    userLevelUp() {
      dispatch({ type: 'USER_LEVEL_UP' });
    },
    userLifeState(life) {
      dispatch({ type: 'USER_LIFE_STATE', life });
    },
    userPointState(point) {
      dispatch({ type: 'USER_POINT_STATE', point });
    },
    // nowProblem() {
    //   dispatch({ type: 'NOW_PROBLEM' });
    // }
  }
}

export default connect(listenStateToProps, listenDispatchProps)(AppComponent);
