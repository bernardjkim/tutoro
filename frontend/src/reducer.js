import { combineReducers } from 'redux';
import globalReducer from './containers/App/reducer';
import signupReducer from './containers/SignUp/reducer';
import loginReducer from './containers/Login/reducer';
import homeReducer from './containers/Home/reducer';
// import entities from './entities_reducer';

//   entities,
export default combineReducers({
    global: globalReducer,
    signup:  signupReducer,
    login: loginReducer,
    home: homeReducer



});