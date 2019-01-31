import axios from 'axios';
import {
    receiveProfileError,
    receiveCourses,
    receiveLocations,
    receiveLanguages,
    receiveMajors
} from './action';
import { CLOSE_UPDATEPROFILE_FORM } from '../constant';
import { receiveProfile, receiveProfilePic } from '../action';

export const createNewProfile = profile => dispatch => {
    // append every inforamtion in to a formData along with image
    const formData = new FormData();
    Object.keys(profile).forEach(key => {
        if (key !== 'image') {
            formData.append(key, profile[key]);
        } else {
            formData.append('file', profile[key][0]);
        }
    });
    axios
        .post(`/api/profile`, formData)
        .then((res) => {
            dispatch(receiveProfile(res.data.profile));
            dispatch(receiveProfilePic(res.data.profile.image)); 
        })
        .catch(err =>{
            dispatch(receiveProfileError(err.response.data))
        }
    );

};

export const updateProfile = profile => dispatch => {
    // append every inforamtion in to a formData along with image
    const formData = new FormData();
    Object.keys(profile).forEach(key => {
        if (key !== 'image') {
            formData.append(key, (profile[key]));
        } else {
            formData.append('file', profile[key][0]);
        }
    });
    debugger
    axios
        .put(`/api/profile`, formData)
        .then((res) => {
            dispatch(receiveProfile(res.data.profile));
            dispatch(receiveProfilePic(res.data.profile.image)); 
        })
        .then(()=> dispatch({ type: CLOSE_UPDATEPROFILE_FORM }))
        .catch(err =>{
            dispatch(receiveProfileError(err.response.data))
        }
    );

};


export const getFormOptions = () => dispatch  => {
    // get courses under that name 
    // for ex. name == CSE then fetch all classes under CSE

    axios
        .get(`/api/course`)
        .then(res=>{
            dispatch(receiveCourses(res.data));

        });
    axios
        .get(`/api/location`)
        .then(res=> dispatch(receiveLocations(res.data)));
    axios
        .get(`/api/language`)
        .then(res=> dispatch(receiveLanguages(res.data)));
    axios
        .get(`/api/major`)
        .then(res=> {
            dispatch(receiveMajors(res.data))});
}
