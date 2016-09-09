import React from 'react';
import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import YouTube from 'react-youtube';

import styles from './styles.css';
import store from 'config/store';
import * as action from './actions';

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
  }

  readyHandler() {
    let width = document.getElementsByClassName('player')[0].offsetWidth;
    let height = document.getElementsByClassName('player')[0].offsetHeight;
    store.dispatch(action.init(width, height));
  }

  nextHandler() {
    store.dispatch(action.updateStatus('finished'));
    store.dispatch(action.next());
  }

  playHandler() {
    store.dispatch(action.updateStatus('playing'));
  }

  pauseHandler() {
    store.dispatch(action.updateStatus('paused'));
  }

  stateChangeHandler(event) {
  }

  render() {
    return(
      <YouTube
        className='player'
        videoId={this.props.player.video}
        opts={this.props.yt}
        onReady={this.readyHandler}
        onStateChange={this.stateChangeHandler}
        onEnd={this.nextHandler}
        onPlay={this.playHandler}
        onPause={this.pauseHandler}
      />
    );
  }
}

VideoPlayer.propTypes = {
  yt: React.PropTypes.object
}

VideoPlayer.defaultProps = {
  yt: {
    playerVars: {
      autoplay: 1,
      // listType: 'playlist',
      // list: [],
    }
  }
}

const mapStateToProps = function(store) {
  return {
    player: store.player.toJS(),
    playlist: store.playlist.toJS().items
  };
};

export default connect(mapStateToProps)(VideoPlayer);
