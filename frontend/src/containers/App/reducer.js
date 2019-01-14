import { RECEIVE_CURRENT_USER } from './constant';
import isEmpty from '../../validations/is_empty';


const initialState = {
    isAuthenticated: false,
    user: {}
};

export default  (state = initialState, action) => {
    switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
    }
};
