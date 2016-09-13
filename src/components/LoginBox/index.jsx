import React from 'react';
import styles from './styles.css';

import FacebookLogin from 'react-facebook-login';

const LoginBox = (props) => {

  return (
    <div className='row login-box'>
      You need to login to use the app
      <FacebookLogin
        appId={ENV.FB_APP_ID.toString()}
        autoLoad={true}
        fields="name,email,picture"
        callback={props.responseFacebook}
        cssClass='loginBtn'
        textButton='Login with Facebook'
      />
    </div>
  );
}

export default LoginBox;
