import React from 'react';
import { Route } from 'react-router';
import App from './modules/App/NewApp';
import Login from './modules/Login/Login';
import Dashboard from './modules/Dasboard/index';
import Welcome from './modules/WelcomeChallenge/index';
import Finished from './modules/FinishedChallenge/index';
// import ErrorMessage from './newModules/NotFound/NotFound';

// this works.//

const MyRoutes = (
  <Route component={App}>
    <Route path="/" component={Login} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/challenge" component={Welcome} />
    <Route path="/finished" component={Finished} />
  </Route>
);

export default MyRoutes;
