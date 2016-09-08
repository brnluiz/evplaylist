import * as type from './constants';
import {fromJS} from 'immutable';

const initialState = fromJS({
  status: 'paused',
  position: '0',
  video: 'iV5VKdcQOJE',
  height: 'auto',
  width: 'auto',
  index: 0
});

function playerReducer(state = initialState, action) {
  switch(action.type) {
    case type.UPDATE_DIMS:
      return state
      .set('width', action.width)
      .set('height', action.height);

    case type.NEXT:
      // // TODO: check how to use a map() to implement this
      // let index = state.get('index');
      // let playlistSize = state.get('playlist').size;
      //
      // // If the playlist finished, go to the beginning of the playlist
      // // Otherwise just increment the index
      // (index+1 >= playlistSize) ? index = 0 : index++;
      //
      // // Get the next video id
      // let video = state.getIn(['playlist', index, 'video_id']);
      //
      // console.log('Video:', video, '|index:', index);
      //
      // return state
      // .set('video', video)
      // .set('index', index);
      return state;

    case type.PLAY:
      return state
      .set('video', action.item.video_id)
      .set('index', action.item.id);

    case type.UPDATE:
      return state.set('status', action.status);

    default:
      return state;
  }
}

export default playerReducer;
