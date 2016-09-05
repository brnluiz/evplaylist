import * as type from './constants';
import {fromJS} from 'immutable';

const initialState = fromJS({
  status: 'paused',
  position: '0',
  video: 'iV5VKdcQOJE',
  index: 0,
  playlist: [{
    id: 0,
    video_id: 'iV5VKdcQOJE',
    post_id: '123',
    user_id: '456',
    user_name: 'Bruno Luiz da Silva',
    title: '505 lyrics - Arctic Monkeys',
    duration: '3:00',
    post_likes: 12
  }, {
    id: 1,
    video_id: 'yxHw2CmdI9A',
    post_id: '123',
    user_id: '456',
    user_name: 'Bruno Luiz da Silva',
    title: 'Metallica - Kill \'Em All [Full Album HD]',
    duration: '3:00',
    post_likes: 12
  }, {
    id: 2,
    video_id: 'iV5VKdcQOJE',
    post_id: '123',
    user_id: '456',
    user_name: 'Bruno Luiz da Silva',
    title: '505 lyrics - Arctic Monkeys',
    duration: '3:00',
    post_likes: 12
  }]
});

function playerReducer(state = initialState, action) {
  switch(action.type) {
    case type.NEXT_MUSIC:
      // TODO: check how to use a map() to implement this
      let index = state.get('index');
      let playlistSize = state.get('playlist').size;

      // If the playlist finished, go to the beginning of the playlist
      // Otherwise just increment the index
      (index+1 >= playlistSize) ? index = 0 : index++;

      // Get the next video id
      let video = state.getIn(['playlist', index, 'video_id']);

      console.log('Video:', video, '|index:', index);

      return state
      .set('video', video)
      .set('index', index);

    case type.CHANGE_MUSIC:
      console.log('Video:', action.item.video_id, '|index:', action.item.id);
      return state
      .set('video', action.item.video_id)
      .set('index', action.item.id);

    case type.PLAYER_UPDATE:
      return state.set('status', action.status);

    default:
      return state;
  }
}

export default playerReducer;
