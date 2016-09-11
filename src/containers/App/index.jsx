import React from 'react';
import { connect } from 'react-redux';
import * as keys from 'config/keys';

import AppLayout from 'components/AppLayout';

import store from 'config/store';
import * as playlist from 'containers/Playlist/actions';
import Facebook from 'utils/FacebookPromises';
import FacebookLogin from 'react-facebook-login';
import * as action from './actions';
import Loading from 'components/Loading';

class App extends React.Component {
  constructor(props) {
    super(props);
    store.dispatch(action.checkLoginState());
  }

  componentDidMount() {
  }

  queryHandler(data) {
    store.dispatch(playlist.fetch(data.query));
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
