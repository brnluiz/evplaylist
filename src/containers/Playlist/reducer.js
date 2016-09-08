import * as type from './constants';
import {fromJS} from 'immutable';
import * as keys from 'config/keys';

import FacebookPromises from 'utils/FacebookPromises';
import YoutubeDataApi from 'utils/YoutubeDataApi';
let testQuery = '/1120426798025135/feed?fields=id,link,likes.limit(0).summary(true),from&limit=1000';

const initialState = fromJS({
  status: type.INIT,
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
  }, {
    id: 1,
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
      .set('fbtoken', action.fbtoken)
      .set('status', type.LOADING);

    case type.FETCH:
      let token = state.get('fbtoken');
      let fb = new FacebookPromises(token);
      let yt = new YoutubeDataApi(keys.YT_API_KEY);

      return state
      .set('items', action.items)
      .set('status', type.LOADED);


    default:
      return state;
  }
}

export default playlistReduce;
