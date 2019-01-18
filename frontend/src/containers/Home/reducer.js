import { combineReducers } from 'redux';
import { RECIEVE_PROFILE, OPEN_NEWPROFILE_FORM } from './constant';


const profileReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECIEVE_PROFILE:
            return action.payload;
        case OPEN_NEWPROFILE_FORM:
        // if no profile we make profile: false and 
        // make new profile
            return false;
        default:
            return state;
    }
}
export default combineReducers({
    profile: profileReducer
})