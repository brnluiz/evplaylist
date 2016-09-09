import React from 'react';
import { Component, PropTypes } from 'react';

import VideoPlayer from 'containers/VideoPlayer';
import Playlist from 'containers/Playlist';
import Loading from 'components/Loading';

import styles from './styles.css'

const PlayerLayout = (props) => {
  if (props.isLoading === true) {
    return <Loading />
  }

  return (
    <div className='row playerlayout'>
      <div className='col-lg-8'>
        <div className="embed-responsive embed-responsive-16by9">
          <VideoPlayer />
        </div>
      </div>
      <div className='col-lg-4'>
        <Playlist />
      </div>
    </div>
  );
}

export default PlayerLayout;
