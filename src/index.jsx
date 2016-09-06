import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import routes from 'config/routes';
import store from 'config/store';
import facebook from 'config/facebook';

render((
  <Provider store={store}>
    {routes}
  </Provider>
), document.getElementById('app'));
