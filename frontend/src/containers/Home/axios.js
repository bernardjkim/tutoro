import axios from 'axios';
import { 
    receiveProfile, 
    openNewProfileForm,
    receiveProfilePic,
} from './action';

export const fetchProfile = () => dispatch => {
  axios
    .get('/api/profile/current')
    .then(res => {
        dispatch(receiveProfile(res.data.profile));
        dispatch(receiveProfilePic(res.data.profilePic));
    })
    .catch(err =>{
    // if we do not find the profile we make a new profile
      dispatch(openNewProfileForm())
    }
    );
};