import React from 'react';

import styles from './styles.css';

const PlaylistItem = ({props, onClickHandler}) => (
    <li className="list-group-item" onClick={onClickHandler}>
      <div className="music-info">
        <span className="info-title">{props.title}</span>
        <span className="badge info-duration">{props.duration}</span>
      </div>
      <div className="social-info">
        <span className="info-props info-post">
          <i className="fa fa-external-link"></i> <a target="blank_" href={"http://facebook.com/" + props.post_id}>Go to post</a>
        </span>
        <span className="info-props info-user">
          <i className="fa fa-user"></i> <a target="blank_" href={"http://facebook.com/" + props.user_id}>{props.user}</a>
        </span>
        <span className="info-props info-likes">
          <i className="fa fa-heart"></i> {props.post_likes}
        </span>
      </div>
    </li>
);

export default PlaylistItem;
