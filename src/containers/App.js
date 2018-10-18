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
} from '../constants/ActionTypes'

const BASE_URL = `http://localhost:5000`;
// const BASE_URL = `http://192.168.0.132:5000`;

const listenStateToProps = (state) => {
  console.dir(state);
  return {
    router: state.router,
    user: {
      token: state.user.token,
      uid: state.uid,
    },
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
          console.log(result);
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
          // add dispatch error
          alert('Get problem failed');
          console.log(err);
        });
    },
    problemInitialize() {
      dispatch({ type: USER_STATE_INIT });
    }
  }
}

export default connect(listenStateToProps, listenDispatchProps)(AppComponent);
