import * as type from './constants';
import thunk from 'redux-thunk';
import {Facebook} from 'utils/FacebookPromises';

export const checkLoginState = () => {
  return (dispatch, getState) => {
    // Do not allow not logged users to reach this container
    Facebook.checkStatus().then((res) => {
      let status = (res.status === 'connected') ? true : false;
      
      dispatch({
        type: type.CHECK_LOGIN_STATUS,
        status: status
      });
    }, err => { throw err; })
    .catch(err => {
      console.log(err);
      dispatch({
        type: type.CHECK_LOGIN_STATUS,
        status: false
      });
    })
  }
}
