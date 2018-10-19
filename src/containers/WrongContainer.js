import { connect } from 'react-redux';
import axios from 'axios';
import WrongComponent from '../components/WrongComponent';
import {
  GET_WRONG_ANSWER,
  WRONG_YOUTUBE_PLAYER_CHANGE,
  LIKE_BUTTON_STATE,
  ADD_LIKE_STATE
} from '../constants/ActionTypes';

let BASE_URL;
if (process.env.NODE_ENV === 'development') {
  BASE_URL = `http://api-dev.listenup.kr`;
} else {
  BASE_URL = `http://api.listenup.kr`;
}

const wrongStateToProps = (state) => {
  return {
    uid: state.userStateReducer.uid,
    token: state.userStateReducer.token,
    allWrongAnswers: state.wrongAnswerReducer.allWrongAnswers,
    currentYoutubePlayer: state.wrongAnswerReducer.currentYoutubePlayer,
    isLikeLoading: state.wrongAnswerReducer.isLikeLoading
  };
};

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
            type: WRONG_YOUTUBE_PLAYER_CHANGE,
            player: response.data.result
          });
          return response.data.result;
        })
        .catch((err) => {
          alert('Get answer failed');
          console.log(err);
        });
    },
    wrongPlayerChange(player) {
      dispatch({ type: WRONG_YOUTUBE_PLAYER_CHANGE, player });
    },
    userAnswerLike(data) {
      dispatch({ type: ADD_LIKE_STATE, data });
      return axios({
        url: BASE_URL + '/answers/like',
        method: 'put',
        headers: {
          'authorization': 'Bearer ' + ownProps.token
        },
        data
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
      dispatch({ type: ADD_LIKE_STATE, data });
      return axios({
        url: BASE_URL + '/answers/unlike',
        method: 'put',
        headers: {
          'authorization': 'Bearer ' + ownProps.token
        },
        data
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
