import React from 'react';
import { Component, PropTypes } from 'react';
import FacebookLogin from 'react-facebook-login';
import { connect } from 'react-redux';
import {Router, hashHistory} from 'react-router';

import store from 'config/store';
import * as keys from 'config/keys';

import * as playlist from 'containers/Playlist/actions';
import LandingPage from 'components/LandingPage';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  queryHandler(data) {
    let query = playlist.getEventId(data.query);
    hashHistory.push('/playlist/'+query);
  }

  render() {
    return (
      <LandingPage onSubmit={this.queryHandler}/>
    )
  }
}

const mapStateToProps = function(store) {
  return {
  };
};

export default connect(mapStateToProps)(HomePage)
