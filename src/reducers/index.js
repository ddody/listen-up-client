import { combineReducers } from 'redux';
import userStateReducer from './user';
import problemReducer from './game';
import rankingReducer from './ranking';
import wrongAnswerReducer from './wrongAnswer';

const rootReducer = combineReducers({
  userStateReducer,
  problemReducer,
  rankingReducer,
  wrongAnswerReducer
});

export default rootReducer;
