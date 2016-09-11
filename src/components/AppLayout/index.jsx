import React from 'react';
import { Component, PropTypes } from 'react';
import styles from './styles.css'

import Header from 'components/Header';
import LoginBox from 'components/LoginBox';

class AppLayout extends React.Component {
  render() {
    if (!this.props.isLoggedIn) {
      return (
        <div>
          <Header
            onSubmit={this.props.queryHandler}
            queryValue={this.props.queryValue}
          />
          <div className='container'>
            <LoginBox responseFacebook={this.props.responseFacebook} />
          </div>
        </div>
      )
    }
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
