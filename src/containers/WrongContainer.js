import { connect } from 'react-redux';
import axios from 'axios';
import WrongComponent from '../components/WrongComponent';
import {
  GET_WRONG_ANSWER,
  GET_PROBLEM_BY_WRONG,
  WRONG_PLAYER_CHANGE,
  LIKE_BUTTON_STATE,
} from '../constants/ActionTypes'

const BASE_URL = `http://localhost:5000`;

const wrongStateToProps = (state) => {
  return {
    router: state.router,
    getAnswers: state.getAnswers,
    getProblem: state.getProblem,
    wrongPlayer: state.wrongPlayer,
    wrongPlayerDisplay: state.wrongPlayerDisplay,
    isLikeLoading: state.isLikeLoading
  };
};

// const wrongStateToProps = (state) => {
//   return {
//     router: state.router,
//     getAnswers: state.getAnswers,
//     getProblem: state.getProblem,
//     wrongPlayer: state.wrongPlayer,
//     wrongPlayerDisplay: state.wrongPlayerDisplay,
//     isLikeLoading: state.isLikeLoading
//   };
// };

const wrongDispatchProps = (dispatch, ownProps) => {
  return {
    getWrongAnswer(query) {
      axios({
        url: query ? BASE_URL + '/answers/?sort=' + query : BASE_URL + '/answers',
        method: 'get',
        headers: {
          'authorization': 'Bearer ' + ownProps.token
        }
      })
        .then((response) => {
          dispatch({
            type: GET_WRONG_ANSWER,
            answers: response.data.result
          });
        })
        .catch((err) => {
          alert('Get answer failed');
          console.log(err);
        });
    },
    getProblemByWrong(id) {
      return axios({
        url: BASE_URL + '/problems/' + id,
        method: 'get',
        headers: {
          'authorization': 'Bearer ' + ownProps.token
        }
      })
        .then((response) => {
          dispatch({
            type: GET_PROBLEM_BY_WRONG,
            problem: response.data.result
          });
        })
        .catch((err) => {
          alert('Get answer failed');
          console.log(err);
        });
    },
    wrongPlayerChange(player) {
      dispatch({ type: WRONG_PLAYER_CHANGE, player });
    },
    userAnswerLike(data) {
      return axios({
        url: BASE_URL + '/answers/like',
        method: 'put',
        headers: {
          'authorization': 'Bearer ' + ownProps.token
        },
        data
      })
        .then((response) => {
          dispatch({
            type: GET_WRONG_ANSWER,
            answers: response.data.result
          });
        })
        .then(() => {
          dispatch({ type: LIKE_BUTTON_STATE, state: false });
        })
        .catch((err) => {
          alert('Get answer failed');
          console.log(err);
        });
    },
    userAnswerUnLike(data) {
      return axios({
        url: BASE_URL + '/answers/unlike',
        method: 'put',
        headers: {
          'authorization': 'Bearer ' + ownProps.token
        },
        data
      })
        .then((response) => {
          dispatch({ type: GET_WRONG_ANSWER, answers: response.data.result });
        })
        .then(() => {
          dispatch({ type: LIKE_BUTTON_STATE, state: false });
        })
        .catch((err) => {
          alert('Get answer failed');
          console.log(err);
        });
    },
    likeButtonState(state) {
      dispatch({ type: LIKE_BUTTON_STATE, state });
    }
  };
};

export default connect(wrongStateToProps, wrongDispatchProps)(WrongComponent);
