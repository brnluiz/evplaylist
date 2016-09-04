import React from 'react';
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'

import PlayerBox from 'containers/PlayerBox';

const routes =
<Route path="/" component={PlayerBox}/>;

export default routes;
