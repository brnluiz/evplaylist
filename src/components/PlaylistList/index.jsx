import React from 'react';
import PlaylistItem from 'components/PlaylistItem';

import styles from './styles.css';

const PlaylistList = ({items, onClickHandler, height, show, activeItem}) => (
  <ul
    className="list-group music-list"
    style={{
      height: height
    }}
  >
    {items.map((music) => <PlaylistItem
      props={music}
      key={music.id}
      isActive={(activeItem === music.video_id) ? true : false }
      onClickHandler={() => onClickHandler(music)}
    />)}
  </ul>
);

export default PlaylistList;
