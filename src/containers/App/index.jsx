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

  responseFacebook(response) {
  }

  render() {
    if(this.props.isLoggedIn) {
      return(
        <AppLayout>
          {this.props.children}
        </AppLayout>
      );
    } else {
      <FacebookLogin
        appId={keys.FB_APP_ID}
        autoLoad={true}
        callback={this.responseFacebook}
      />
    }

    return <Loading />
  }
}

const mapStateToProps = function(store) {
  return {
    isLoggedIn: store.app.toJS().loggedIn
  }
};

export default connect(mapStateToProps)(App)
