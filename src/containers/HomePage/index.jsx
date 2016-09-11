import React from 'react';
import { Component, PropTypes } from 'react';
import FacebookLogin from 'react-facebook-login';
import { connect } from 'react-redux';
import {Router, hashHistory} from 'react-router';

import store from 'config/store';
import * as keys from 'config/keys';

import * as playlist from 'containers/Playlist/actions';
import styles from './styles.css';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  responseFacebook(response) {
    // hashHistory.push('/');
  }

  render() {
    return (
      <div className="homepage">
        <div className="row">
          <div className="col-md-offset-3 col-md-6">
            <h1>
              <a href="#/"><span className="glyphicon glyphicon-headphones" aria-hidden="true"></span> EvPlaylist</a>
            </h1>
            <h2>Playlists made from Facebook Events posts</h2>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-offset-3 col-lg-6">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Insert the event URL here and..." />
              <span className="input-group-btn">
                <button className="btn btn-danger" type="button">
                  <span className="glyphicon glyphicon-play" aria-hidden="true"></span>
                </button>
              </span>
            </div>
          </div>
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
