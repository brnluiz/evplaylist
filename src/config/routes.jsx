import React from 'react';
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'

import PlayerBox from 'containers/PlayerBox';
import HomePage from 'containers/HomePage';

export default (
  <Router history={hashHistory}>
    <Route path="/" component={PlayerBox}/>
    <Route path="/test" component={HomePage}/>
  </Router>
);
