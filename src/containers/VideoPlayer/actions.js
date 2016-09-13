import * as type from './constants';
import thunk from 'redux-thunk';

export const next = () => {
  return (dispatch, getState) => {
    let playlist = getState().playlist.toJS().items;

    dispatch({
      type: type.NEXT,
      playlist: playlist
    });
  }
}

export const play = (item) => {
  return (dispatch, getState) => {
    let playlist = getState().playlist.toJS().items;
    let index = playlist.findIndex((obj) => {
      return obj.id === item.id;
    });
    console.log(index);

    dispatch({
      type: type.PLAY,
      item: item,
      index: index
    });
  }
}

export const updateStatus = (status) => {
  return {
    type: type.UPDATE,
    status: status
  }
}

export const init = (width, height) => {
  return (dispatch, getState) => {
    let playlist = getState().playlist.toJS().items;

    dispatch({
      type: type.INIT,
      width: width,
      height: height,
      playlist: playlist
    });
  };
}

export const isLoading = (status) => {
  return {
    type: type.UPDATE_STATUS_LOADING,
    status: status
  }
}
