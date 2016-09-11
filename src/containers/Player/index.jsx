import React from 'react';
import { connect } from 'react-redux';

import PlayerLayout from 'components/PlayerLayout';

import store from 'config/store';
import * as playlist from 'containers/Playlist/actions';

class PlayerContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if(this.props.params.fbid) {
      store.dispatch(playlist.fetch(this.props.params.fbid));
    }
  }

  render() {
    return(
      <PlayerLayout isLoading={this.props.isLoading} />
    );
  }
}

const mapStateToProps = function(store) {
  let playlistLoadingStatus = store.playlist.toJS().loading;
  let playerLoadingStatus = store.player.toJS().loading;
  let isLoading = (playlistLoadingStatus || playerLoadingStatus) ? true : false;

  return {
    isLoading: playlistLoadingStatus,
  };
};

export default connect(mapStateToProps)(PlayerContainer)
