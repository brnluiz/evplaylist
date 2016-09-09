import * as type from './constants';
import {fromJS} from 'immutable';

const initialState = fromJS({
  loggedIn: false
});

const appReducer = (state = initialState, action) => {
  switch(action.type) {
    case type.CHECK_LOGIN_STATUS:
      return state
        .set('loggedIn', action.status);

    default:
      return state;
  }
}

export default appReducer;
