import React from 'react';
import { Component, PropTypes } from 'react';
import styles from './styles.css'

import Header from 'components/Header';
import LoginBox from 'components/LoginBox';
import Loading from 'components/Loading';

class AppLayout extends React.Component {
  render() {
    let content;
    if (this.props.isLoading) {
      content = <Loading />;
    }
    else if (!this.props.isLoggedIn) {
      content = <LoginBox responseFacebook={this.props.responseFacebook} />
    }
    else {
      content = this.props.children;
    }

    return (
      <div>
        <Header
          onSubmit={this.props.queryHandler}
          queryValue={this.props.queryValue}
        />
        <div className='container'>
          {content}
        </div>
      </div>
    );
  }
}

export default AppLayout;
