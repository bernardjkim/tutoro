import {
  RECEIVE_LOGIN_ERRORS,
  RECEIVE_SIGNUP_ERRORS,
  CLEAR_ERRORS,
  RECEIVE_CURRENT_USER
} from '../action/session_actions';

const initnialState = {
  login: {},
  signup: {}
}
const errorsReducer = (state = initnialState, action) => {
  const newState = Object.assign({}, state);
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_LOGIN_ERRORS:
    newState.login = action.payload;
      return newState;
    case RECEIVE_SIGNUP_ERRORS:
    newState.signup = action.payload;
      return newState;
    case CLEAR_ERRORS:
      return initnialState;
    case RECEIVE_CURRENT_USER:
      return initnialState;
    default:
      return state;
  }
};

export default errorsReducer;