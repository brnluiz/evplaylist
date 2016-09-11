import React from 'react';
import { connect } from 'react-redux';
import {Router, hashHistory} from 'react-router';

import store from 'config/store';
import * as keys from 'config/keys';
import * as playlist from 'containers/Playlist/actions';
import * as action from './actions';

import AppLayout from 'components/AppLayout';
import Facebook from 'utils/FacebookPromises';
import FacebookLogin from 'react-facebook-login';
import Loading from 'components/Loading';

class App extends React.Component {
  constructor(props) {
    super(props);
    store.dispatch(action.checkLoginState());
  }

  componentDidMount() {
  }

  queryHandler(data) {
    let query = playlist.getEventId(data.query);
    hashHistory.push('/playlist/'+query);
  }

  responseFacebook(response) {
  }

  render() {
    if(!this.props.isLoggedIn) {
      // redirect to the login page
    }

    return (
      <AppLayout
        queryHandler={this.queryHandler}
        queryValue={this.props.fbid}
        isLoggedIn={this.props.isLoggedIn}
        responseFacebook={this.responseFacebook}
      >
        {this.props.children}
      </AppLayout>
    );
  }
}

const mapStateToProps = function(store) {
  return {
    isLoggedIn: store.app.toJS().loggedIn,
    fbid: store.playlist.toJS().fbid
  }
};

export default connect(mapStateToProps)(App)
