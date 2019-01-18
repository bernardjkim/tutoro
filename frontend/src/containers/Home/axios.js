import axios from 'axios';
import { receiveProfile, openNewProfileForm } from './action';

export const fetchProfile = () => dispatch => {
  axios
    .get('/api/profile/current')
    .then(res => {
        dispatch(receiveProfile(res.response.data));
    })
    .catch(err =>{
    // if we do not find the profile we make a new profile
      dispatch(openNewProfileForm())
    }
    );
};