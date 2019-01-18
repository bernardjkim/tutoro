import axios from 'axios';
import { receiveProfile, openNewProfileForm } from './action';

export const fetchProfile = () => dispatch => {
    debugger
  axios
    .get('/api/profile/current')
    .then(res => {
        debugger
        dispatch(receiveProfile(res.response.data));
    })
    .catch(err =>{
        debugger
    // if we do not find the profile we make a new profile
      dispatch(openNewProfileForm())
    }
    );
};