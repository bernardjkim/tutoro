import {
    CREATE_NEW_PROFILE
} from '../action/profile_action';

const initState = {
    ownProfile: {}
}

const profileReducer = (state = initState, action) => {
  switch (action.type) {
    case CREATE_NEW_PROFILE:
      return {
        ...state,
        ownProfile: action.payload
      };
    default:
      return state;
  }
};

export default profileReducer;