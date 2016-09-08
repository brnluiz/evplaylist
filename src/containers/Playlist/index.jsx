import React from 'react';
import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import PlaylistList from 'components/PlaylistList';

import styles from './styles.css';
import store from 'config/store';
import * as action from './actions';
import * as player from 'containers/VideoPlayer/actions';

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    store.dispatch(action.fetch());
  }

  itemClickHandler(item) {
    store.dispatch(player.play(item));
  }

  render() {
    return(
      <PlaylistList
        items={this.props.playlist}
        height={this.props.player.height}
        onClickHandler={this.itemClickHandler.bind(this)}
        />
    );
  }
}

const mapStateToProps = function(store) {
  return {
    playlist: store.playlist.toJS().items,
    player: store.player.toJS()
  };
};

export default connect(mapStateToProps)(Playlist)
