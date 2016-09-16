import React from 'react';
import { Component, PropTypes } from 'react';
import styles from './styles.css'

import DocumentMeta from 'react-document-meta';

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

    const meta = {
      title: 'EvPlaylist',
      description: 'Easily create music playlists from Facebook Events',
      canonical: 'http://brunoluiz.net/evplaylist',
      meta: {
        charSet: 'utf-8',
        name: {
          keywords: 'music,playlist,party,youtube'
        },
        property: {
          'og:site_name': 'EvPlaylist'
        }
      },
      auto: {
        ograph: true
      }
    };

    return (
      <DocumentMeta {...meta}>
        <Header
          onSubmit={this.props.queryHandler}
          queryValue={this.props.queryValue}
        />
        <div className='container'>
          {content}
        </div>
      </DocumentMeta>
    );
  }
}

export default AppLayout;
