import React from 'react';
import PlaylistItem from 'components/PlaylistItem';

import styles from './styles.css';

const PlaylistList = ({items, onClickHandler}) => (
  <div className="list-group music-list">
    {items.map((music) => <PlaylistItem
      props={music}
      key={music.id}
      onClickHandler={() => onClickHandler(music)}
    />)}
  </div>
);

export default PlaylistList;
