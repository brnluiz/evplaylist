import React from 'react';
import { Component, PropTypes } from 'react';
import Header from 'components/Header';
import styles from './styles.css'

import * as playlist from 'Containers/Playlist/actions';
import store from 'config/store';

class AppLayout extends React.Component {
  render() {
    return (
      <div>
        <Header onSubmit={this.props.queryHandler} />
        <div className='container'>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default AppLayout;
