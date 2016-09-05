import * as type from './constants';

export function playNext() {
  return {
    type: type.NEXT_MUSIC
  };
}

export function playMusic(item) {
  return {
    type: type.CHANGE_MUSIC,
    item: item
  }
}

export function updatePlayerStatus(status) {
  return {
    type: type.PLAYER_UPDATE,
    status: status
  }
}
