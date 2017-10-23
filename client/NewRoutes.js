import React from 'react';
import { Route } from 'react-router';
import Main from './NewMain';
import Home from './newModules/Home/Home';
import Login from './newModules/Login/Login';
import SignUp from './newModules/SignUp/SignUp';
import ErrorMessage from './newModules/NotFound/NotFound';

const MyRoutes = (
  <Route component={Main}>
    <Route path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={SignUp} />
    <Route path="*" component={ErrorMessage} />
  </Route>
);

export default MyRoutes;
