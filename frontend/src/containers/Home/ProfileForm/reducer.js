import {
    RECIEVE_PROFILE_ERROR,
    RECIEVE_COURSES_OPTIONS,
    RECEIVE_LOCATION_OPTIONS,
    RECEIVE_LANGUAGE_OPTIONS,
    RECIEVE_MAJOR_OPTIONS,
} from './constant';

const initState = {
    courses: [],
    error: '',
    locations: [],
    languages: [],
    majors: [],


}
// profile error reducer
export default (state = initState, action) => {
    const newState = Object.assign({}, state);
    Object.freeze(state);
    switch (action.type) {
        case RECIEVE_COURSES_OPTIONS:
            newState.courses = action.payload;
            return newState;
        case RECIEVE_PROFILE_ERROR:
            newState.error = action.payload;
            return newState;
        case RECIEVE_MAJOR_OPTIONS:
            newState.majors = action.payload;
            return newState;
        case RECEIVE_LOCATION_OPTIONS:
            newState.locations = action.payload;
            return newState;
        case RECEIVE_LANGUAGE_OPTIONS:
            newState.languages = action.payload;
            return newState;
        default:
            return state;
    }
};
