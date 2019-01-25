import { combineReducers } from "redux";
import {
  RECIEVE_PROFILE,
  RECIEVE_PROFILE_PIC,
  OPEN_NEWPROFILE_FORM,
  RECEIVE_COURSES,
  RECEIVE_PROFILE_WITH_COURSE
} from "./constant";

import optionsReducers from "./NewForm/reducer";

const iniState = { profile: {}, newForm: false, profileswithCourse: []};
const profileReducer = (state = iniState, action) => {
  const newState = Object.assign({}, state);
  Object.freeze(state);
  switch (action.type) {
    case RECIEVE_PROFILE:
      newState.newForm = false;
      newState.profile = action.payload;
      return newState;
    case OPEN_NEWPROFILE_FORM:
      newState.newForm = true;
      return newState;
    case RECIEVE_PROFILE_PIC:
      newState.profilePic = action.payload;
      return newState;
    case RECEIVE_COURSES:
      newState.courses = action.payload.courses;
      return newState;
    case RECEIVE_PROFILE_WITH_COURSE:
      newState.profileswithCourse = action.payload.profiles;
      return newState;
    default:
      return state;
  }
};
export default combineReducers({
  profile: profileReducer,
  options: optionsReducers
});
