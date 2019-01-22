import axios from 'axios';
import {
    receiveProfileError
} from './action';

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
        .post(`/api/profile`, formData)
        .then((res) => {
            
        })
        .catch(err =>{
        dispatch(receiveProfileError(err))
        }
    );

};

export const getCourses = name => dispatch  => {
    // get courses under that name 
    // for ex. name == CSE then fetch all classes under CSE

    axios
        .get(`/api/courses/${name}`)
        .then(res=> {
            dispatch()

        })
}

