import React from 'react';
import PlaylistItem from 'components/PlaylistItem';

import styles from './styles.css';

class PlaylistList extends React.Component {
  shouldComponentUpdate() {
    if(document
      .getElementsByClassName('music-list')[0]
      .getElementsByClassName('active')
      .length > 0) {

        // Get the active element position
      let activePosY = document
        .getElementsByClassName('music-list')[0]
        .getElementsByClassName('active')[0]
        .offsetTop;

      // Update the playlist list to the active element position
      document
        .getElementsByClassName('music-list')[0].scrollTop = activePosY;
    }

    return true;
  }

  render() {
    return (
      <ul
        className="list-group music-list"
        style={{
          height: this.props.height
        }}
      >
        {this.props.items.map((music) => <PlaylistItem
          props={music}
          key={music.id}
          isActive={(this.props.activeItem === music.video_id) ? true : false }
          onClickHandler={() => this.props.onClickHandler(music)}
        />)}
      </ul>
    );
  }
}
export default PlaylistList;
