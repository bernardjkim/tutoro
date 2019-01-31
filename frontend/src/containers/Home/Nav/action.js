import setAuthToken from '../../util/set_auth_token';
import {RECEIVE_CURRENT_USER} from './constant';
import { OPEN_UPDATEPROFILE_FORM } from '../constant';

export const receiveCurrentUser = userData => ({
  type: RECEIVE_CURRENT_USER,
  payload: userData
});

export const openUpdateProfile = () => ({
  type: OPEN_UPDATEPROFILE_FORM,
})

export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken');
  // Remove auth hearder for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(receiveCurrentUser({}));
};