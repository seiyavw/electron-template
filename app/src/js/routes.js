import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App.jsx';
import HomePage from './containers/HomePage.jsx';
import CounterPage from './containers/CounterPage.jsx';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/counter" component={CounterPage} />
  </Route>
);
