/*
My new client entry point
*/

import React from 'react';
import { render } from 'react-dom';

import { Router, browserHistory } from 'react-router';
import MyRoutes from './NewRoutes';
// import './NewMain.css';

const rootElement = document.getElementById('root');

// this works.
// using Router and passing in props. routes

render(
  <Router history={browserHistory} routes={MyRoutes} />,
  rootElement
);


/*
// this doesn't work. if MyRoutes contains Router and all the routes.
render(
  <MyRoutes />,
  rootElement
);
*/
