import React from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Student from './pages/Student';
import Teacher from './pages/Teacher';
import { Switch, Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from "./auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

export const Routes = () => {
    return (
        <Switch>
            <Route path="/" component={Login} exact/>
            <Route path="/register" component={Register}/>
            <PrivateRoute path="/student" component={Student}/>
            <PrivateRoute path="/teacher" component={Teacher}/>
        </Switch>
    );
};