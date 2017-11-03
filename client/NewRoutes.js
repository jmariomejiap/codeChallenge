import React from 'react';
import { Route, withRouter } from 'react-router';
import App from './modules/App/NewApp';
import Home from './modules/Home/Home';
import Login from './modules/Login/Login';
import SignUp from './modules/SignUp/SignUp';
import Dashboard from './modules/Dasboard/index';
import Welcome from './modules/WelcomeChallenge/index';
import auth from './util/auth';
// import ErrorMessage from './newModules/NotFound/NotFound';

// this works.//

const MyRoutes = (
  <Route component={App} auth={auth}>
    <Route path="/home" component={Home} />
    <Route path="/login" component={withRouter(Login)} />
    <Route path="/signup" component={SignUp} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/challenge" component={Welcome} />
  </Route>
);

export default MyRoutes;

// catch all route has been removed since it was crashing tests.
// <Route path="*" component={ErrorMessage} />


/*
// using Router from here causes errors.

const MyRoutes = (
  <Router history={browserHistory} >
    <Route component={Main}>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route path="*" component={ErrorMessage} />
    </Route>
  </Router>
);

export default MyRoutes;
*/


/*
// props arg in a function is not working

const MyRoutes = props => {
  return (
    <Router history={browserHistory}>
      <Route component={Main}>
        <Route path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="*" component={ErrorMessage} />
      </Route>
    </Router>
  );
};

export default MyRoutes;
*/
