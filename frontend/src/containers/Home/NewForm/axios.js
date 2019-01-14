import axios from 'axios';
import {receiveProfileError} from './action';

export const createNewProfile = profile => dispatch => {
    // append every inforamtion in to a formData along with image
    const formData = new FormData();
    Object.keys(profile).forEach(key => {
        if (key !== 'image') {
            formData.append(key, profile[key]);
        } else {
            formData.append(key, profile[key][0]);
        }
    });
    const {userId} = profile;
    axios
        .post(`/api/users/${userId}/profile`, formData)
        .then((res) => {
            console.log(res);
        })
        .catch(err =>{
        dispatch(receiveProfileError)
        }
    );

};

