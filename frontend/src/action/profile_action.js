import axios from 'axios';



export const CREATE_NEW_PROFILE = 'CREATE_NEW_PROFILE';
export const RECIEVE_PROFILE_ERROR = 'RECIEVE_PROFILE_ERROR';

export const createNewProfile = profile => dispatch => {
    const formData = new FormData();
    Object.keys(profile).forEach(key => {
        if (key !== 'img') {
            formData.append(key, profile.key);
        } else {
            formData.append(key, profile.key[0]);
        }
    });
    const {userId} = profile;

    axios
        .post(`/api/users/${userId}/profile`, formData)
        .then((res) => {
            console.log(res)
        })
        .catch(err =>{
        dispatch({
            type: RECIEVE_PROFILE_ERROR,
            payload: err.response.data
        })
        }
    );

};