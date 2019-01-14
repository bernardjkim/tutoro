import {
    RECEIVE_CURRENT_USER
}
    from './constant';

export const receiveCurrentUser = userData => {
  return {
    type: RECEIVE_CURRENT_USER,
    payload: userData
  };
};