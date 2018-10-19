import { blankPopValidation, regexEn } from '../utils/validation';
import {
  GET_GAME_PROBLEMS,
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

const initialState = {
  problems: [],
  level: 1,
  life: 7,
  isSolved: null,
  isClear: null,
  isHint: null,
  inGameWrongAnswerList: [],
  inGameWrongAnswerIndex: null,
  isLastHint: false,
  isIncorrectAnimation: false
};

function problemReducer(state = initialState, action) {
  switch (action.type) {
    case GET_GAME_PROBLEMS:
      const problemsCopy = action.problems.slice();
      return Object.assign({}, state, {
        ...state,
        problems: problemsCopy
      });
    case USER_LEVEL_UP:
      return Object.assign({}, state, {
        ...state,
        level: state.level + 1,
      });
    case USER_LIFE_STATE:
      return Object.assign({}, state, {
        ...state,
        life: action.life
      });
    case USER_STATE_INIT:
      return Object.assign({}, state, {
        ...state,
        life: 7,
        level: 1,
        inGameWrongAnswerList: [],
        inGameWrongAnswerIndex: null,
        isLastHint: false
      });
    case SELECT_CURRENT_PROBLEM:
      let problemCopy = state.problems.slice();
      const userAnswer = problemCopy[state.level - 1].lyrics.split('').map(box => " ");
      problemCopy[state.level - 1].userAnswer = userAnswer;
      return Object.assign({}, state, {
        ...state,
        problems: problemCopy
      });
    case USER_ANSWER_CHECK:
      let userProblemCopy = state.problems.slice();
      userProblemCopy[state.level - 1].userAnswer = action.answer;
      return Object.assign({}, state, {
        ...state,
        problems: userProblemCopy
      });
    case USER_PROBLEM_SOLVED:
      return Object.assign({}, state, {
        ...state,
        isSolved: action.state
      });
    case USER_LEVEL_CLEAR:
      return Object.assign({}, state, {
        ...state,
        isClear: action.clear
      });
    case USER_HINT_STATE:
      return Object.assign({}, state, {
        ...state,
        isHint: action.hint
      });
    case SAVE_WRONG_ANSWER:
      const nowProblem = state.problems[state.level - 1];
      const nowAnswer = blankPopValidation(nowProblem.userAnswer.slice()).join('');
      const answerCopy = state.inGameWrongAnswerList.slice();
      const regexAnswer = regexEn(nowAnswer);
      const _answerCopy = answerCopy.map(copy => copy.answer);
      if (nowProblem.lyrics.length === nowAnswer.length && nowProblem.lyrics !== nowAnswer && _answerCopy.indexOf(nowAnswer) === -1 && !regexAnswer) {
        answerCopy.push(Object.assign({}, {
          answer: nowAnswer,
          problemId: nowProblem._id
        }));
      }

      return Object.assign({}, state, {
        ...state,
        inGameWrongAnswerList: answerCopy
      });
    case SELECT_ANSWER_NUMBER:
      return Object.assign({}, state, {
        ...state,
        inGameWrongAnswerIndex: action.number
      });
    case ON_LAST_HINT:
      return Object.assign({}, state, {
        ...state,
        isLastHint: action.hint
      });
    case INCORRENT_ANSWER_ANIMAITION:
      return Object.assign({}, state, {
        ...state,
        isIncorrectAnimation: action.value
      });
    default:
      return Object.assign({}, state);
  }
}

export default problemReducer;
