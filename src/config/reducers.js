import { combineReducers } from 'redux';

// Import your reducers here
import playerReducer from 'containers/PlayerBox/reducer'

// Combine the imported reducers below
var reducers = combineReducers({
  // helloWorldState: helloWorldReducer,
  playerState: playerReducer
});

export default reducers;
