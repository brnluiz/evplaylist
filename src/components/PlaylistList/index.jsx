import React from 'react';
import PlaylistItem from 'components/PlaylistItem';

import styles from './styles.css';

const PlaylistList = ({items, onClickHandler, height}) => (
  <ul className="list-group music-list" style={{height: height}}>
    {items.map((music) => <PlaylistItem
      props={music}
      key={music.id}
      onClickHandler={() => onClickHandler(music)}
    />)}
  </ul>
);

export default PlaylistList;
