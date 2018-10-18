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
} from '../constants/ActionTypes'

const INIT_POINT = 100;
const BASE_URL = `http://localhost:5000`;
// const BASE_URL = `http://192.168.0.132:5000`;

const challengeStateToProps = (state) => {
  return {
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
  }
}

// const challengeStateToProps = (state) => {
//   return {
//     problems: state.problems,
//     problem: state.problem,
//     userLevel: state.userLevel,
//     userLife: state.userLife,
//     userPoint: state.userPoint,
//     isSolved: state.isSolved,
//     isClear: state.isClear,
//     isHint: state.isHint,
//     wrongAnswer: state.wrongAnswer,
//     wrongSelectNumber: state.wrongSelectNumber
//   }
// }

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
    saveWrongAnswer(wrong) {
      dispatch({ type: SAVE_WRONG_ANSWER, wrong });
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
    }
  }
}

export default connect(challengeStateToProps, challengeDispatchProps)(ChallengeComponent);
