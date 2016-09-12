import React from 'react';
import { Component, PropTypes } from 'react';

import VideoPlayer from 'containers/VideoPlayer';
import Playlist from 'containers/Playlist';
import Loading from 'components/Loading';
import MessageBox from 'components/MessageBox';
import Footer from 'components/Footer';
import GoogleAd from 'react-google-ad'

import styles from './styles.css'

const PlayerLayout = (props) => {
  if (props.isLoading === true) {
    return <Loading />
  }
  else if (props.error.status == true) {
    return <MessageBox
      message={props.error.message}
      type='error'
    />
  }

  let style = {
    display: 'block'
  }

  return (
    <div>
      <div className='row playerlayout'>
        <div className='col-lg-8'>
          <div className='embed-responsive embed-responsive-16by9'>
            <VideoPlayer />
          </div>
        </div>
        <div className='col-lg-4'>
          <Playlist />
        </div>
      </div>
      <div className='row details'>
        <div className='col-lg-8'>
          <span>Playlist from: </span>
          <a href={'http://facebook.com/'+props.fbid} target='_blank'>{props.title}</a>
        </div>
        <div className='col-lg-4 details-buttons'>
          <a className='alter-btn' href={'http://facebook.com/'+props.fbid} target='_blank'><i className='fa fa-external-link'></i> Event link</a>
          <a className='a2a_dd alter-btn' href='https://www.addtoany.com/share_save'><i className='fa fa-share-alt-square'></i> Share playlist</a>
          <script type='text/javascript' src='//static.addtoany.com/menu/page.js'></script>
        </div>
      </div>
      <div className='row ad'>
        <GoogleAd client="ca-pub-0717102508536262" slot="7559481052" format="auto" />
      </div>
      <Footer />
    </div>
  );
}

export default PlayerLayout;
