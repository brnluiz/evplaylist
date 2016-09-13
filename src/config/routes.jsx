import React from 'react';
import { render } from 'react-dom'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import ReactGA from 'react-ga'

import App from 'containers/App';
import Player from 'containers/Player';
import HomePage from 'containers/HomePage';

ReactGA.initialize(ENV.GANALYTICS);

const logPageView = () => {
  if(process.env.NODE_ENV !== 'production') return ;

  ReactGA.set({
    page: window.location.pathname
  });
  ReactGA.pageview(window.location.pathname);
}

if (process.env.NODE_ENV === 'production') {
}

export default (
  <Router
    history={hashHistory}
    onUpdate={logPageView}
  >
    <Route path='/' component={HomePage} />
    <Route path='/playlist' component={App}>
      <Route path=':fbid' component={Player} />
    </Route>
  </Router>
);
