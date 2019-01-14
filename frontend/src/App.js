import React, { Component } from "react";
import "./stylesheet/App.scss";
// Redux
import store from "./store";
import { Provider } from "react-redux";

import {
  receiveCurrentUser,
  logoutUser,
  loginUser
} from "./action/session_actions";

import jwt_decode from "jwt-decode";
import setAuthToken from "./util/set_auth_token";

import App from './containers/App/index';

if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(receiveCurrentUser(decoded));

  // if token is expired we log out user
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
}
// store.dispatch(logoutUser());
const testUser = {
  email: "test123@uw.edu",
  password: "test123@uw.edu"
};
store.dispatch(loginUser(testUser));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
          <App/>
      </Provider>
    );
  }
}

export default App;
