import React from 'react';
import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import YouTube from 'react-youtube';

import PlaylistList from 'components/PlaylistList';
import styles from './styles.css';
import store from 'config/store';
import * as action from './actions';

class PlayerBox extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  playlistItemClickHandler(item) {
    store.dispatch(action.updatePlayerStatus('finished'));
    store.dispatch(action.playMusic(item));
  }

  playNextHandler() {
    store.dispatch(action.updatePlayerStatus('finished'));
    store.dispatch(action.playNext());
  }

  playHandler() {
    store.dispatch(action.updatePlayerStatus('playing'));
  }

  pauseHandler() {
    store.dispatch(action.updatePlayerStatus('paused'));
  }

  render() {
    return(
      <div className='container'>
        <div className='row'>
          <div className='col-lg-7'>
            <div className="embed-responsive embed-responsive-16by9">
              <YouTube
                className='player'
                videoId={this.props.player.video}
                opts={this.props.yt}
                onEnd={this.playNextHandler}
                onPlay={this.playHandler}
                onPause={this.pauseHandler}
              />
            </div>
          </div>
          <div className='col-lg-5'>
            <PlaylistList
              items={this.props.playlist}
              onClickHandler={this.playlistItemClickHandler.bind(this)}
              />
          </div>
        </div>
      </div>
    );
  }
}

PlayerBox.propTypes = {
  yt: React.PropTypes.object
}

PlayerBox.defaultProps = {
  yt: {
    playerVars: {
      autoplay: 0
    }
  }
}

const mapStateToProps = function(store) {
  return {
    playlist: store.playerState.get('playlist').toJS(),
    player: store.playerState.toJS()
  };
};

export default connect(mapStateToProps)(PlayerBox)
