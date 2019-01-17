import {
    RECIEVE_PROFILE_ERROR,
    RECIEVE_COURSES,
    RECIEVE_PROFILE,
    RECIEVE_COURSES_NAME
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
});

export const receiveCoursesName = res => ({
    type: RECIEVE_COURSES_NAME,
    payload: res.response.data
});



