import {
    RECIEVE_PROFILE_ERROR,
    RECIEVE_COURSES_OPTIONS,
    RECEIVE_LOCATION_OPTIONS,
    RECEIVE_LANGUAGE_OPTIONS,
    RECIEVE_MAJOR_OPTIONS,
} from './constant';

export const receiveProfileError = (err) => ({
    type: RECIEVE_PROFILE_ERROR,
    payload: err.error.description
});


export const receiveCourses = res => ({
    type: RECIEVE_COURSES_OPTIONS,
    payload: res.courses
});

export const receiveLocations = res => ({
    type: RECEIVE_LOCATION_OPTIONS,
    payload: res.locations
});

export const receiveLanguages = res => ({
    type: RECEIVE_LANGUAGE_OPTIONS,
    payload: res.languages
});

export const receiveMajors = res => ({
    type: RECIEVE_MAJOR_OPTIONS,
    payload: res.majors
});





