import { combineReducers } from 'redux';

// Import your reducers here
import playerReducer from 'containers/VideoPlayer/reducer'
import playlistReducer from 'containers/Playlist/reducer'
import appReducer from 'containers/App/reducer'

// Combine the imported reducers below
var reducers = combineReducers({
  player: playerReducer,
  playlist: playlistReducer,
  app: appReducer
});

export default reducers;
