import { combineReducers } from 'redux';

import newProfileErrorReducer from './NewForm/reducer';

export default combineReducers({
    newProfileError: newProfileErrorReducer
})