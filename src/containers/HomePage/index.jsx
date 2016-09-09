import React from 'react';
import { Component, PropTypes } from 'react';
import FacebookLogin from 'react-facebook-login';
import { connect } from 'react-redux';
import {Router, hashHistory} from 'react-router';

import store from 'config/store';
import * as keys from 'config/keys';

import * as playlist from 'containers/Playlist/actions';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  responseFacebook(response) {
    // TODO: save it at a cookie AND extend it
    let token = response.accessToken;
    store.dispatch(playlist.setFbToken(token));
    hashHistory.push('/');
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <FacebookLogin
            appId={keys.FB_APP_ID}
            autoLoad={true}
            callback={this.responseFacebook}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = function(store) {
  return {
  };
};

export default connect(mapStateToProps)(HomePage)
