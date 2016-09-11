import React from 'react';
import { Component, PropTypes } from 'react';
import Header from 'components/Header';
import styles from './styles.css'

import FacebookLogin from 'react-facebook-login';
import * as keys from 'config/keys'

class AppLayout extends React.Component {
  render() {
    return (
      <div>
        <Header
          onSubmit={this.props.queryHandler}
          queryValue={this.props.queryValue}
        />
        <div className='container'>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default AppLayout;
