import {
    RECEIVE_CURRENT_USER, 
    RECEIVE_LOGIN_ERRORS}
    from 'constant';
export const receiveCurrentUser = userData => {
  return {
    type: RECEIVE_CURRENT_USER,
    payload: userData
  };
};