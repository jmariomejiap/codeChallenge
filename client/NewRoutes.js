import React from 'react';
import { Route } from 'react-router';
import Main from './NewMain';
import Home from './newModules/Home/Home';
import Login from './newModules/Login/Login';
import SignUp from './newModules/SignUp/SignUp';
import ErrorMessage from './newModules/NotFound/NotFound';

// this works.//

const MyRoutes = (
  <Route component={Main}>
    <Route path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={SignUp} />
    <Route path="*" component={ErrorMessage} />
  </Route>
);

export default MyRoutes;


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
