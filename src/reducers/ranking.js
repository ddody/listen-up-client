import {
  GET_USER_RANKING
} from '../constants/ActionTypes'

const initialState = {
  ranking: [],
};

function rankingReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_RANKING:
      return Object.assign({}, state, {
        ranking: action.ranking
      });
    default:
      return Object.assign({}, state);
  }
}

export default rankingReducer;
