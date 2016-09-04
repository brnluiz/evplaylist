import React from 'react';
import PlaylistItem from 'components/PlaylistItem';

import styles from './styles.css';

const PlaylistList = ({items}) => (
  <div className="list-group music-list">
    {items.map((music,i) => <PlaylistItem
      key={i}
      item={music}/>)}
  </div>
);

export default PlaylistList;
