import {
RECIEVE_COURSES,
RECIEVE_COURSES_NAME,
} from './constant';

const initState = {
    courses: {},
    errors: {}
}
// profile error reducer
export default (state = initState, action) => {
    const newState = Object.assign({}, state);
    Object.freeze(state);
    switch (action.type) {
        case RECIEVE_COURSES:
            newState.courses = action.payload;
            return newState;
        default:
            return state;
    }
};
