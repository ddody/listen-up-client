const initialState = {
  isLogin: false,
  userToken: null,
  uid: null,
  problems: [],
  userLevel: 0,
  userLife: 5,
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
      console.log(problemsCopy);
      return Object.assign({}, state, {
        problems: problemsCopy
      });
    case 'USER_LEVEL_UP':
      return Object.assign({}, state, {
        userLevel: state.userLevel + 1
      });
    case 'USER_LIFE_STATE':
      return Object.assign({}, state, {
        userLife: action.life
      });
    case 'USER_STATE_INIT':
      return Object.assign({}, state, {
        userLife: 5,
        userLevel: 0
      });
    default:
      return Object.assign({}, state);
  }
}