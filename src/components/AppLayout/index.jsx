import React from 'react';
import { Component, PropTypes } from 'react';
import Header from 'components/Header';
import styles from './styles.css'

import * as playlist from 'Containers/Playlist/actions';
import store from 'config/store';

class AppLayout extends React.Component {
  headerHandler(data) {
    console.log(data);
    store.dispatch(playlist.fetch(data.fbid));
  }

  render() {
    return (
      <div>
        <Header onSubmit={this.headerHandler} />
        <div className='container'>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default AppLayout;
