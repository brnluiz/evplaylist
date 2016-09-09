import React from 'react';
import { connect } from 'react-redux';

import PlayerLayout from 'components/PlayerLayout';

// import styles from './styles.css';
import store from 'config/store';
// import * as action from './actions';

class PlayerContainer extends React.Component {
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
