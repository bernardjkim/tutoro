import {
  RECEIVE_CURRENT_USER,
  RECIEVE_PROFILE,
  OPEN_NEWPROFILE_FORM,
  RECIEVE_PROFILE_PIC,
  RECEIVE_COURSES,
  RECEIVE_PROFILE_WITH_COURSE
} from "./constant";
import setAuthToken from "../util/set_auth_token";
import axios from "axios";
import { RSA_NO_PADDING } from "constants";

export const receiveCurrentUser = userData => {
  return {
    type: RECEIVE_CURRENT_USER,
    payload: userData
  };
};

export const receiveProfile = profile => ({
  type: RECIEVE_PROFILE,
  payload: profile
});

export const receiveProfilePic = pic => ({
  type: RECIEVE_PROFILE_PIC,
  payload: pic
});

export const openNewProfileForm = () => ({
  type: OPEN_NEWPROFILE_FORM,
  
});

export const receiveCourses = courses => ({
  type: RECEIVE_COURSES,
  payload: courses
});

export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth hearder for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(receiveCurrentUser({}));
};


export const fetchProfileWithCourse = courseName => dispatch => {
  axios
    .get(`/api/profile?name=${courseName}`)
    .then(res=> {
      dispatch({
      type: RECEIVE_PROFILE_WITH_COURSE,
      payload: res.data
    })})
} 