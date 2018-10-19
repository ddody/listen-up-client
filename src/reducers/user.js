import {
  ON_USER_LOGIN,
  ON_USER_LOGOUT,
} from '../constants/ActionTypes';

const initialState = {
  token: null,
  uid: null
};

function userStateReducer(state = initialState, action) {
  switch (action.type) {
    case ON_USER_LOGIN:
      return Object.assign({}, state, {
        token: action.token,
        uid: action.uid
      });
    case ON_USER_LOGOUT:
      return Object.assign({}, state, {
        token: null,
        uid: null
      });
    default:
      return Object.assign({}, state);
  }
}

export default userStateReducer;
