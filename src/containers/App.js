import { connect } from 'react-redux';
import AppComponent from '../components/AppComponent';
import firebase from '../services/firebase';
import axios from 'axios';
import {
  ON_USER_LOGIN,
  ON_USER_LOGOUT,
  GET_GAME_PROBLEMS,
  USER_STATE_INIT,
  SELECT_CURRENT_PROBLEM
} from '../constants/ActionTypes';
import BASE_URL from '../url/base-url';

const listenStateToProps = (state) => {
  return {
    router: state.router,
    token: state.userStateReducer.token,
    uid: state.userStateReducer.uid
  };
};

const listenDispatchProps = (dispatch, ownProps) => {
  return {
    onAuthStateChanged() {
      firebase
        .auth()
        .onAuthStateChanged((user) => {
          if (user) {
            this.onLoginAndImportToken({
              uid: user.uid,
              name: user.displayName
            });
          } else {
            dispatch({ type: ON_USER_LOGOUT });
          }
        });
    },
    onLoginAndImportToken(data) {
      axios
        .post(BASE_URL + `/users/login`, {
          uid: data.uid,
          name: data.name
        })
        .then((response) => {
          dispatch({
            type: ON_USER_LOGIN,
            token: response.data.token,
            uid: data.uid
          });
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
          this.props.onLoginAndImportToken({
            uid: result.user.uid,
            name: result.user.displayName
          });
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
          dispatch({ type: ON_USER_LOGOUT });
        })
        .catch((err) => {
          alert('Logout failed');
          console.log(err);
        });
    },
    getGameProblems(token) {
      return axios({
        url: BASE_URL + `/problems/random`,
        method: 'get',
        headers: {
          'authorization': 'Bearer ' + token
        }
      })
        .then((reponse) => {
          dispatch({ type: USER_STATE_INIT });
          dispatch({
            type: GET_GAME_PROBLEMS,
            problems: reponse.data.result
          });
          dispatch({ type: SELECT_CURRENT_PROBLEM });
        })
        .then(() => {
          ownProps.history.push('/problem');
        })
        .catch((err) => {
          alert('Get problem failed');
          console.log(err);
        });
    },
    problemInitialize() {
      dispatch({ type: USER_STATE_INIT });
    },
    createProblemSubmit(data) {
      axios({
        url: BASE_URL + `/problems`,
        method: 'post',
        data: data,
        headers: {
          'authorization': "Bearer " + data.token
        }
      })
        .then(() => {
          alert('Submit success');
          ownProps.history.push('/');
        })
        .catch((err) => {
          alert('Problem creation failed');
          console.log(err);
        });
    },
  }
}

export default connect(listenStateToProps, listenDispatchProps)(AppComponent);
