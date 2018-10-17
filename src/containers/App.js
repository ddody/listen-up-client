import { connect } from 'react-redux';
import AppComponent from '../components/AppComponent';
import firebase from '../services/firebase';
import axios from 'axios';

const BASE_URL = `http://localhost:5000`;
const POST_LOGIN = BASE_URL + `/users/login`;
const POST_CREATE_PROBLEM = BASE_URL + `/problems`;
const GET_PROBLEMS = BASE_URL + `/problems/random`; //query string ?limit=3
const INIT_POINT = 100;

const listenStateToProps = (state) => {
  return {
    router: state.router,
    isLogin: state.isLogin,
    userToken: state.userToken,
    uid: state.uid,
    problems: state.problems,
    problem: state.problem,
    userLevel: state.userLevel,
    userLife: state.userLife,
    userPoint: state.userPoint,
    isSolved: state.isSolved,
    isClear: state.isClear,
    isHint: state.isHint,
    wrongAnswer: state.wrongAnswer,
    wrongSelectNumber: state.wrongSelectNumber
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
            dispatch({ type: 'ON_USER_LOGOUT' });
          }
        });
    },
    onLoginAndImportToken(data) {
      axios
        .post(POST_LOGIN, {
          uid: data.uid,
          name: data.name
        })
        .then((response) => {
          dispatch({ type: 'ON_USER_LOGIN', userToken: response.data.token, uid: data.uid });
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
          'authorization': 'Bearer ' + token
        }
      })
        .then((reponse) => {
          dispatch({ type: 'USER_STATE_INIT' });
          dispatch({ type: 'GET_PROBLEMS', problems: reponse.data.result });
          dispatch({ type: 'NOW_PROBLEM' });
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
    sendProblemPoint(data) {
      axios({
        url: BASE_URL + `/users/` + data.uid + `/points`,
        method: 'post',
        data: {
          uid: data.uid,
          point: data.life * INIT_POINT
        },
        headers: {
          'authorization': "Bearer " + data.token
        }
      })
        .then((result) => {
          alert('Point add success');
          ownProps.history.push('/');
        })
        .catch((err) => {
          alert('Point add failed');
          console.log(err);
        });
    },
    userLevelUp() {
      dispatch({ type: 'USER_LEVEL_UP' });
      dispatch({ type: 'NOW_PROBLEM' });
    },
    userLifeState(life) {
      dispatch({ type: 'USER_LIFE_STATE', life });
    },
    userPointState(point) {
      dispatch({ type: 'USER_POINT_STATE', point });
    },
    userAnswerCheck(answer) {
      dispatch({ type: 'USER_ANSWER_CHECK', answer });
    },
    userPloblemSolved(state) {
      dispatch({ type: 'USER_PROBLEM_SOLVED', state });
    },
    userLevelClear(clear) {
      dispatch({ type: 'USER_LEVEL_CLEAR', clear });
    },
    userHintState(hint) {
      dispatch({ type: 'USER_HINT_STATE', hint });
    },
    problemInitialize() {
      dispatch({ type: 'USER_STATE_INIT' });
    },
    saveWrongAnswer(wrong) {
      dispatch({ type: 'SAVE_WRONG_ANSWER', wrong });
    },
    selectAnswerNumber(number) {
      dispatch({ type: 'SELECT_ANSWER_NUMBER', number });
    },
    sendSelectAnswer(data) {
      if (data.wrongArr) {
        axios({
          url: BASE_URL + `/answers`,
          method: 'post',
          data: {
            uid: data.uid,
            ...data.wrongArr
          },
          headers: {
            'authorization': "Bearer " + data.token
          }
        })
          .then((result) => {
            alert('Answer add success');
            ownProps.history.push('/');
          })
          .catch((err) => {
            alert('Answer add failed');
            console.log(err);
          });
      } else {
        ownProps.history.push('/');
      }
    }
  }
}

export default connect(listenStateToProps, listenDispatchProps)(AppComponent);
