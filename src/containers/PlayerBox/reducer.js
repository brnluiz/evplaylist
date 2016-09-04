import * as types from './constants';
import {fromJS} from 'immutable';

const initialState = fromJS({
  musicIndex: 0,
});

function playerReducer(state = initialState, action) {
  switch(action.type) {
    case types.NEXT_MUSIC:
      return state.map(musicIndex => musicIndex + 1);

    default:
      return state;
  }
}

export default playerReducer;
