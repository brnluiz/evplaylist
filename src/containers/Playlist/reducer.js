import * as type from './constants';
import {fromJS} from 'immutable';
import * as keys from 'config/keys';

const initialState = fromJS({
  loading: true,
  error: false,
  fbtoken: '',
  fbid: '',
  title: '',
  items: [{
    id: 0,
    video_id: '',
    post_id: '',
    user_id: '',
    user: '',
    title: '',
    duration: 'MM:SS',
    post_likes: 12
  }]
});

function playlistReduce(state = initialState, action) {
  switch(action.type) {
    case type.INIT:
      return state;

    case type.SETUP:
      return state
      .set('fbtoken', action.fbtoken);

    case type.UPDATE_STATUS_LOADING:
      return state
      .set('loading', action.status);

    case type.FETCH:
      return state
      .set('fbid', action.fbid)
      .set('items', action.items)
      .set('loading', false);

    default:
      return state;
  }
}

export default playlistReduce;
