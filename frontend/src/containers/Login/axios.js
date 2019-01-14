import axios from 'axios';
import setAuthToken from '../util/set_auth_token';
import jwt_decode from 'jwt-decode';
import {receiveCurrentUser} from './action';
import {RECEIVE_LOGIN_ERRORS} from './constant';

export default  userData => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      // set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(receiveCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: RECEIVE_LOGIN_ERRORS,
        payload: err.response.data
      })
    );
};