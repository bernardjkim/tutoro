import axios from 'axios';
import setAuthToken from '../util/set_auth_token';
import jwt_decode from 'jwt-decode';
import {RECEIVE_SIGNUP_ERRORS} from './constant';
import {receiveCurrentUser} from './action';

export const signupUser = userData => dispatch => {
  axios
    .post('/api/users/signup', userData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      // set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      console.log('decoded -<<', decoded)
      // Set current user
      dispatch(receiveCurrentUser(decoded));
    })
    .catch(err =>{
      dispatch({
        type: RECEIVE_SIGNUP_ERRORS,
        payload: err.response.data
      })
    }
    );
};