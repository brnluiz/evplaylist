import React from 'react';
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'

import HelloWorldBox from 'containers/HelloWorldBox/HelloWorldBox';

const routes =
<Route path="/" component={HelloWorldBox}/>;

export default routes;
