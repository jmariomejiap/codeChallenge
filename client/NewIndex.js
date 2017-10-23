/*
My new client entry point
*/

import React from 'react';
import { render } from 'react-dom';

import { Router, browserHistory } from 'react-router';
import MyRoutes from './NewRoutes';

const rootElement = document.getElementById('root');

render(
  <Router history={browserHistory} routes={MyRoutes} />,
  rootElement
);
