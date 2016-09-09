import * as type from './constants';
import {fromJS} from 'immutable';
import * as keys from 'config/keys';

const initialState = fromJS({
  loading: true,
  error: false,
  fbtoken: '',
  items: [{
    id: 0,
    video_id: 'iV5VKdcQOJE',
    post_id: '123',
    user_id: '456',
    user: 'Bruno Luiz da Silva',
    title: '505 lyrics - Arctic Monkeys',
    duration: '3:00',
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
      .set('items', action.items)
      .set('loading', false);

    default:
      return state;
  }
}

export default playlistReduce;
