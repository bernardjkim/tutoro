import {
    RECIEVE_PROFILE_ERROR,
    RECIEVE_COURSES,
    RECIEVE_PROFILE
} from './constant';

export const receiveProfileError = (err) => ({
    type: RECIEVE_PROFILE_ERROR,
    payload: err.response.data
});

export const receiveProfile = res => ({
    type: RECIEVE_PROFILE,
    payload: res.response.data
});

export const receiveCourses = res => ({
    type: RECIEVE_COURSES,
    payload: res.response.data
})

