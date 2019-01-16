import {
RECIEVE_PROFILE_ERROR,
RECIEVE_COURSES,
RECIEVE_PROFILE
} from './constant';

const initState = {
    profile: {},
    courses: {},
    errors: {}
}
// profile error reducer
export default (state = initState, action) => {
    const newState = Object.assign({}, state);
    Object.freeze(state);
    switch (action.type) {
        case RECIEVE_PROFILE_ERROR:
            newState.errors = action.payload;
            return newState;
        case RECIEVE_PROFILE:
            newState.profile = action.payload;
            return newState;
        case RECIEVE_COURSES:
            newState.courses = action.payload;
            return newState;
        default:
            return state;
    }
};
