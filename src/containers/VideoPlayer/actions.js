import * as type from './constants';

export const next = () => {
  return {
    type: type.NEXT
  };
}

export const play = (item) => {
  return {
    type: type.PLAY,
    item: item
  }
}

export const updateStatus = (status) => {
  return {
    type: type.UPDATE,
    status: status
  }
}

export const updateDimensions = (width, height) => {
  return {
    type: type.UPDATE_DIMS,
    width: width,
    height: height
  }
}
