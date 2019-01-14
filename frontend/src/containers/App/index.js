import React from 'react';
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

import { AuthRoute, ProtectedRoute } from '../util/route_util';

import Login from '../Login/index';
import SignUp from '../SignUp/index';
import Home from '../Home/index';



export default  () => {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <AuthRoute exact path="/login" component={Login} />
                    <AuthRoute exact path="/signup" component={SignUp} />
                    <ProtectedRoute exact path="/" component={Home} />
                    <Redirect to="/signup" />
                </Switch>
            </Router>
        </div>

    );
}


