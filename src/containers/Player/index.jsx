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
    } else {
      store.dispatch(playlist.setError('Please, type the Facebook Event URL on the field above'));
    }
  }

  render() {
    return(
      <PlayerLayout
        isLoading={this.props.isLoading}
        error={this.props.error}
        fbid={this.props.fbid}
        title={this.props.title}
      />
    );
  }
}

const mapStateToProps = function(store) {
  let playlistLoadingStatus = store.playlist.toJS().loading;
  let playerLoadingStatus = store.player.toJS().loading;
  let isLoading = (playlistLoadingStatus || playerLoadingStatus) ? true : false;

  return {
    isLoading: playlistLoadingStatus,
    fbid: store.playlist.toJS().fbid,
    title: store.playlist.toJS().title,
    error: store.playlist.toJS().error
  };
};

export default connect(mapStateToProps)(PlayerContainer)
