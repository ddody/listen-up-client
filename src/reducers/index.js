const initialState = {
  isLogin: false,
  userToken: null,
  uid: null,
  problems: [],
  problem: null,
  userLevel: 1,
  userLife: 7,
  userPoint: 0,
  isSolved: null,
  isClear: null,
  isHint: null,
  wrongAnswer: [],
  wrongSelectNumber: null,
  ranking: [],
  getAnswers: [],
  getProblem: [],
  wrongPlayer: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'ON_USER_LOGIN':
      return Object.assign({}, state, {
        isLogin: true,
        userToken: action.userToken,
        uid: action.uid
      });
    case 'ON_USER_LOGOUT':
      return Object.assign({}, state, {
        isLogin: false,
        userToken: null,
        uid: null
      });
    case 'GET_PROBLEMS':
      const problemsCopy = action.problems.slice();
      return Object.assign({}, state, {
        problems: problemsCopy
      });
    case 'USER_LEVEL_UP':
      return Object.assign({}, state, {
        userLevel: state.userLevel + 1,
      });
    case 'USER_LIFE_STATE':
      return Object.assign({}, state, {
        userLife: action.life
      });
    case 'USER_STATE_INIT':
      return Object.assign({}, state, {
        userLife: 7,
        userLevel: 1,
        problem: {},
        wrongAnswer: [],
        wrongSelectNumber: null
      });
    case 'NOW_PROBLEM':
      const problemCopy = state.problems.slice();
      const userAnswer = problemCopy[state.userLevel - 1].lyrics.split('').map(box => " ");
      return Object.assign({}, state, {
        problem: Object.assign({}, problemCopy[state.userLevel - 1], { userAnswer })
      });
    case 'USER_ANSWER_CHECK':
      const userProblemCopy = Object.assign({}, state.problem);
      userProblemCopy.userAnswer = action.answer;
      return Object.assign({}, state, { problem: userProblemCopy });
    case 'USER_PROBLEM_SOLVED':
      return Object.assign({}, state, {
        isSolved: action.state
      });
    case 'USER_LEVEL_CLEAR':
      return Object.assign({}, state, {
        isClear: action.clear
      });
    case 'USER_HINT_STATE':
      return Object.assign({}, state, {
        isHint: action.hint
      });
    case 'SAVE_WRONG_ANSWER':
      let wrongAnswerCopy = state.problem.userAnswer.slice();
      for (let i = wrongAnswerCopy.length - 1; i >= 0; i--) {
        if (wrongAnswerCopy[i] === '' || wrongAnswerCopy[i] === ' ') {
          wrongAnswerCopy.pop();
        } else {
          break;
        }
      }
      // utils/validate.js
      wrongAnswerCopy = wrongAnswerCopy.join('');
      let answerCopy = state.wrongAnswer.slice();
      const regex = /[A-Za-z0-9]/;
      const testAnswer = regex.test(wrongAnswerCopy);
      let _answerCopy = answerCopy.map(copy => copy.answer);
      if (state.problem.lyrics.length === wrongAnswerCopy.length && state.problem.lyrics !== wrongAnswerCopy && _answerCopy.indexOf(wrongAnswerCopy) === -1 && !testAnswer) {
        answerCopy.push(Object.assign({}, {
          answer: wrongAnswerCopy,
          problemId: state.problem._id
        }));
      }
      return Object.assign({}, state, {
        wrongAnswer: answerCopy
      });
    case 'SELECT_ANSWER_NUMBER':
      return Object.assign({}, state, {
        wrongSelectNumber: action.number
      });
    case 'GET_USER_RANKING':
      return Object.assign({}, state, {
        ranking: action.ranking
      });
    case 'GET_WRONG_ANSWER':
      return Object.assign({}, state, {
        getAnswers: action.answers
      });
    case 'GET_PROBLEM_BY_WRONG':
      let getProblemCopy = state.getProblem.slice();
      getProblemCopy.push(action.problem);
      return Object.assign({}, state, {
        getProblem: getProblemCopy
      });
    case 'WRONG_PLAYER_CHANGE':
      console.log(state.wrongPlayer);
      console.log(action.player);
      return Object.assign({}, state, {
        wrongPlayer: action.player
      });
    default:
      return Object.assign({}, state);
  }
}