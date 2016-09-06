import React from 'react';
import { Component, PropTypes } from 'react';
import FacebookLogin from 'react-facebook-login';

import { connect } from 'react-redux';

import * as facebook from 'config/facebook';
import FacebookPromises from 'utils/FacebookPromises';

let testQuery = '/1806771916202660/feed?fields=id,link,likes.limit(0).summary(true),from&limit=1000';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  responseFacebook(response) {
    let token = response.accessToken;
    let fb = new FacebookPromises(token);
    fb.get(testQuery).then(function(res) {
      console.log(res);
      return res;
    }).then((res) => {

    });
  }

  render() {
    return (
      <FacebookLogin
        appId={facebook.APP_ID}
        autoLoad={true}
        callback={this.responseFacebook}
      />
    )
  }
}

export default HomePage;
