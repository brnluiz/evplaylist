import graph from 'fb-react-sdk';
import * as keys from 'config/keys';

export const promises = {
  init: () => {
    return new Promise((resolve, reject) => {
      if (typeof FB !== 'undefined') {
        resolve();
      } else {
        window.fbAsyncInit = () => {
          FB.init({
            appId    : keys.FB_APP_ID,
            cookie   : true,
            xfbml    : true,
            version  : 'v2.5'
          });
          resolve();
        };
        (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = "//connect.facebook.net/en_US/sdk.js";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
      }
    });
  },
  checkLoginState: () => {
    return new Promise((resolve, reject) => {
      FB.getLoginStatus((response) => {
        response.status === 'connected' ? resolve(response) : reject(response);
      });
    });
  },
  login: () => {
    return new Promise((resolve, reject) => {
      FB.login((response) => {
        response.status === 'connected' ? resolve(response) : reject(response);
      });
    });
  },
  logout: () => {
    return new Promise((resolve, reject) => {
      FB.logout((response) => {
        response.authResponse ? resolve(response) : reject(response);
      });
    });
  },
  get: (query) => {
    return new Promise((resolve, reject) => {
      FB.api(
        query,
        response => response.error ? reject(response) : resolve(response)
      );
    });
  }
}

export const Facebook = {
  doLogin() {
    return promises.init()
      .then(
        promises.checkLoginState,
        error => { throw error; }
      )
      .then(
        promises.login,
        error => { throw error; }
      )
      .catch((error) => {
        console.log({loading: false, data: {}, status: 'unknown'});
        console.warn(error);
      });
  },
  doLogout() {
    return promises.init()
      .then(
        promises.checkLoginState,
        error => { throw error; }
      )
      .then(
        promises.logout,
        error => { console.log({data: {}, status: 'unknown'}); }
      )
      .catch(error => {
        console.log({loading: false, data: {}, status: 'unknown'});
        console.warn(error);
      });
  },
  checkStatus() {
    return promises.init()
      .then(
        promises.checkLoginState,
        error => { throw error; }
      )
  },
  get(query) {
    return this.checkStatus()
    .then(
      () => (promises.get(query)),
      error => { throw error; }
    )
  }
};
