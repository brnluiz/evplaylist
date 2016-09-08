import React from 'react';
import { Component, PropTypes } from 'react';
import FacebookLogin from 'react-facebook-login';
import { connect } from 'react-redux';
import {Router, hashHistory} from 'react-router';

import store from 'config/store';
import * as keys from 'config/keys';

import FacebookPromises from 'utils/FacebookPromises';
import YoutubeDataApi from 'utils/YoutubeDataApi';

let testQuery = '/1120426798025135/feed?fields=id,link,likes.limit(0).summary(true),from&limit=1000';

import * as playlist from 'containers/Playlist/actions';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  responseFacebook(response) {
    let token = response.accessToken;
    store.dispatch(playlist.setFbToken(token));
    hashHistory.push('/playlist');
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
