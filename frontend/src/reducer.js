import { combineReducers } from 'redux';
import globalReducer from './containers/App/reducer';
import signupReducer from './containers/SignUp/reducer';
// import entities from './entities_reducer';

//   entities,
export default combineReducers({
    global: globalReducer,
    signup:  signupReducer,

});