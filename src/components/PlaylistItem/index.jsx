import React from 'react';

import styles from './styles.css';

const PlaylistItem = ({item}) => (
    <li className="list-group-item">
      <div className="music-info">
        <span className="info-title">{item.youtube.title}</span>
        <span className="badge info-duration">{item.youtube.duration}</span>
      </div>
      <div className="social-info">
        <span className="info-item info-post">
          <i className="fa fa-external-link"></i> <a target="blank_" href={"http://facebook.com/" + item.facebook.post_id}>Go to post</a>
        </span>
        <span className="info-item info-user">
          <i className="fa fa-user"></i> <a target="blank_" href={"http://facebook.com/" + item.facebook.user_id}>{item.facebook.user}</a>
        </span>
        <span className="info-item info-likes">
          <i className="fa fa-heart"></i> {item.facebook.likes}
        </span>
      </div>
    </li>
);

export default PlaylistItem;
