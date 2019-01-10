import React, { Component } from 'react';
import './stylesheet/App.scss';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

// Redux
import store from './store/store';
import { Provider } from 'react-redux';
import { AuthRoute, ProtectedRoute } from './util/route_util';
import { receiveCurrentUser, logoutUser, loginUser } from './action/session_actions';

import jwt_decode from 'jwt-decode';
import setAuthToken from './util/set_auth_token';

// components
import Signup from './components/session/signup_container';
import Login from './components/session/login_container';
import Home from './components/home/home_container';


if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(receiveCurrentUser(decoded));

  // if token is expired we log out user
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  }
}
// const testUser = {
//   email: 'test123@uw.edu',
//   password: 'test123@uw.edu'
// }
// store.dispatch(loginUser(testUser));


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Switch>
              <AuthRoute exact path="/login" component={Login} />
              <AuthRoute exact path="/signup" component={Signup} />
              <ProtectedRoute exact path="/" component={Home} />
              <Redirect to="/signup" />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
