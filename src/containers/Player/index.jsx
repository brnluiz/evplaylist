import React from 'react';
import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import styles from './styles.css';
import store from 'config/store';
import * as action from './actions';

import VideoPlayer from 'containers/VideoPlayer';
import Playlist from 'containers/Playlist';

class Player extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className='container'>
        <div className='row'>
          <div className='col-lg-7'>
            <div className="embed-responsive embed-responsive-16by9">
              <VideoPlayer />
            </div>
          </div>
          <div className='col-lg-5'>
            <Playlist />
          </div>
        </div>
      </div>
    );
  }
}

export default Player
