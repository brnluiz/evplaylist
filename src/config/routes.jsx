import React from 'react';
import { render } from 'react-dom'
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router'

import AppLayout from 'components/AppLayout';
import PlayerContainer from 'containers/PlayerContainer';
import HomePage from 'containers/HomePage';

export default (
  <Router history={hashHistory}>
    <Route path='/login' component={HomePage}/>
    <Route path='/' component={AppLayout}>
      <IndexRoute component={PlayerContainer} />
      <Route path='/playlist(/:fbid)' component={PlayerContainer} />
    </Route>
  </Router>
);
