import axios from "axios";
import { RECEIVE_PROFILE_WITH_COURSE } from './constant';
import {
  receiveProfile,
  openNewProfileForm,
  receiveProfilePic,
  receiveCourses
} from "./action";

export const fetchProfile = () => dispatch => {
  axios
    .get("/api/profile/current")
    .then(res => {
      dispatch(receiveProfile(res.data.profile));
      dispatch(receiveProfilePic(res.data.profile.image));
    })
    .catch(err => {
      // if we do not find the profile we make a new profile
      dispatch(openNewProfileForm());
    });
};
export const fetchProfileWithCourse = courseName => dispatch => {
  dispatch({type: 'LOADING'})
  axios
    .get(`/api/profile?course=${courseName}`)
    .then(res=> {
      dispatch({
      type: RECEIVE_PROFILE_WITH_COURSE,
      payload: res.data
    })})
} 

export const fetchCourses = () => dispatch => {
    axios
      .get(`/api/course`)
      .then(res => {
        dispatch(receiveCourses(res.data));

      });
};
