import { connect } from 'react-redux';
import ChallengeComponent from '../components/ChallengeComponent'
import axios from 'axios';
import {
  USER_LEVEL_UP,
  USER_LIFE_STATE,
  USER_STATE_INIT,
  SELECT_CURRENT_PROBLEM,
  USER_ANSWER_CHECK,
  USER_PROBLEM_SOLVED,
  USER_LEVEL_CLEAR,
  USER_HINT_STATE,
  SAVE_WRONG_ANSWER,
  SELECT_ANSWER_NUMBER,
  ON_LAST_HINT,
  INCORRENT_ANSWER_ANIMAITION
} from '../constants/ActionTypes'

const INIT_POINT = 100;
let BASE_URL;
if (process.env.REACT_APP_NODE_ENV === 'development') {
  BASE_URL = `http://api-dev.listenup.kr`;
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = `http://api.listenup.kr`;
}

const challengeStateToProps = (state) => {
  return {
    uid: state.userStateReducer.uid,
    token: state.userStateReducer.token,
    problems: state.problemReducer.problems,
    level: state.problemReducer.level,
    life: state.problemReducer.life,
    isSolved: state.problemReducer.isSolved,
    isClear: state.problemReducer.isClear,
    isHint: state.problemReducer.isHint,
    inGameWrongAnswerList: state.problemReducer.inGameWrongAnswerList,
    inGameWrongAnswerIndex: state.problemReducer.inGameWrongAnswerIndex,
    isLastHint: state.problemReducer.isLastHint,
    isIncorrectAnimation: state.problemReducer.isIncorrectAnimation
  }
};

const challengeDispatchProps = (dispatch, ownProps) => {
  return {
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
        })
        .catch((err) => {
          alert('Problem creation failed');
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
      dispatch({ type: USER_LEVEL_UP });
      dispatch({ type: SELECT_CURRENT_PROBLEM });
    },
    userLifeState(life) {
      dispatch({ type: USER_LIFE_STATE, life });
    },
    userAnswerCheck(answer) {
      dispatch({ type: USER_ANSWER_CHECK, answer });
    },
    userPloblemSolved(state) {
      dispatch({ type: USER_PROBLEM_SOLVED, state });
    },
    userLevelClear(clear) {
      dispatch({ type: USER_LEVEL_CLEAR, clear });
    },
    userHintState(hint) {
      dispatch({ type: USER_HINT_STATE, hint });
    },
    problemInitialize() {
      dispatch({ type: USER_STATE_INIT });
    },
    saveWrongAnswer() {
      dispatch({ type: SAVE_WRONG_ANSWER });
    },
    selectAnswerNumber(number) {
      dispatch({ type: SELECT_ANSWER_NUMBER, number });
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
    },
    onLastHint(hint) {
      dispatch({ type: ON_LAST_HINT, hint })
    },
    incorrectAnswer() {
      dispatch({ type: INCORRENT_ANSWER_ANIMAITION, value: true });
      setTimeout(() => {
        dispatch({ type: INCORRENT_ANSWER_ANIMAITION, value: false });
      }, 200);
    }
  }
};

export default connect(challengeStateToProps, challengeDispatchProps)(ChallengeComponent);
