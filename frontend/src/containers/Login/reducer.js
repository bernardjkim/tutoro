import {
  RECEIVE_LOGIN_ERRORS,
  CLEAR_ERRORS,
  RECEIVE_CURRENT_USER
} from "./constant";

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_LOGIN_ERRORS:
      return action.payload;
    case CLEAR_ERRORS:
      return {};
    case RECEIVE_CURRENT_USER:
      return {};
    default:
      return state;
  }
};
