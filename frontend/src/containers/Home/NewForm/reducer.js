import {RECIEVE_PROFILE_ERROR} from './constant';

// profile error reducer
export default (state = {}, action) => {
    switch (action.type) {
        case RECIEVE_PROFILE_ERROR:
            return action.payload;
        default:
            return state;
    }
};
