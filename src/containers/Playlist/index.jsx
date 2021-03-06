import React from 'react';
import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import PlaylistList from 'components/PlaylistList';

import store from 'config/store';
import * as player from 'containers/VideoPlayer/actions';

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    // store.dispatch(action.fetch());
  }

  itemClickHandler(item) {
    store.dispatch(player.play(item));
  }

  render() {
    return(
      <PlaylistList
        items={this.props.playlist}
        height={this.props.player.height}
        show={!this.props.player.isLoading}
        onClickHandler={this.itemClickHandler.bind(this)}
        activeItem={this.props.player.video}
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
