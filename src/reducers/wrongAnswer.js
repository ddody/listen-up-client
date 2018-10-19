import {
  GET_WRONG_ANSWER,
  WRONG_YOUTUBE_PLAYER_CHANGE,
  LIKE_BUTTON_STATE,
  ADD_LIKE_STATE
} from '../constants/ActionTypes';

const initialState = {
  allWrongAnswers: [],
  currentYoutubePlayer: null,
  isLikeLoading: false
};

function wrongAnswerReducer(state = initialState, action) {
  switch (action.type) {
    case GET_WRONG_ANSWER:
      return Object.assign({}, state, {
        ...state.wrongAnswer,
        allWrongAnswers: action.answers
      });
    case WRONG_YOUTUBE_PLAYER_CHANGE:
      return Object.assign({}, state, {
        ...state.wrongAnswer,
        currentYoutubePlayer: {
          endTime: action.player.endTime,
          link: action.player.link,
          startTime: action.player.startTime,
        }
      });
    case LIKE_BUTTON_STATE:
      return Object.assign({}, state, {
        ...state.wrongAnswer,
        isLikeLoading: action.state
      });
    case ADD_LIKE_STATE:
      const allWrongAnswersCopy = state.allWrongAnswers.slice();
      const addLikeAnswer = allWrongAnswersCopy.map(answer => {
        if (answer._id === action.data.answerId) {
          answer.active = true;
          if (answer.liked.indexOf(action.data.uid) > -1) {
            answer.liked.splice(answer.liked.indexOf(action.data.uid), 1);
          } else {
            answer.liked.push(action.data.uid);
          }
        } else {
          answer.active = false;
        }
        return answer;
      });
      return Object.assign({}, state, {
        ...state.wrongAnswer,
        allWrongAnswers: addLikeAnswer
      });
    default:
      return Object.assign({}, state);
  }
}

export default wrongAnswerReducer;
