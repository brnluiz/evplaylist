import * as type from './constants';
import {fromJS} from 'immutable';

const initialState = fromJS({
  loading: true,
  error: false,
  status: 'paused',
  position: '0',
  video: '',
  height: '439px',
  width: 'auto',
  index: 0
});

function playerReducer(state = initialState, action) {
  switch(action.type) {
    case type.INIT:
      return state
      .set('video', action.playlist[0].video_id)
      .set('width', action.width)
      .set('height', action.height)
      .set('loading', false);

    case type.UPDATE_STATUS_LOADING:
      return state
      .set('loading', action.status);

    case type.NEXT:
      let index = state.get('index');

      // If the playlist finished go to the beginning of the playlist,
      // otherwise just increment the index
      (index+1 >= action.playlist.length) ? (index = 0) : (index++);

      return state
      .set('video', action.playlist[index].video_id)
      .set('index', index);

    case type.PLAY:
      return state
      .set('video', action.item.video_id)
      .set('index', action.item.id);

    case type.UPDATE:
      return state
      .set('status', action.status);

    default:
      return state;
  }
}

export default playerReducer;
