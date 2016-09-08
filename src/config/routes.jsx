import React from 'react';
import { render } from 'react-dom'
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router'

import PlayerBox from 'containers/PlayerBox';
import Player from 'containers/Player';
import HomePage from 'containers/HomePage';

export default (
  <Router history={hashHistory}>
    <Route path='/'>
      <IndexRoute component={HomePage} />
      <Route path="/test" component={HomePage}/>
      <Route path="/playlist" component={Player}/>
    </Route>
  </Router>
);
