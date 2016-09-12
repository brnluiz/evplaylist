import * as type from './constants';
import {fromJS} from 'immutable';
import * as keys from 'config/keys';

const initialState = fromJS({
  loading: true,
  error: {
    status: false,
    message: ''
  },
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
      .set('loading', action.status)
      .setIn(['error', 'status'], false);

    case type.FETCH:
      return state
      .set('fbid', action.fbid)
      .set('title', action.title)
      .set('items', action.items)
      .set('loading', false)
      .setIn(['error', 'status'], false);

    case type.ERROR:
      return state
        .set('loading', false)
        .setIn(['error', 'status'], true)
        .setIn(['error', 'message'], action.message);

    default:
      return state;
  }
}

export default playlistReduce;
