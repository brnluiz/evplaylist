import React from 'react';
import {Component, PropTypes} from 'react';

import PlaylistList from 'components/PlaylistList';
import YouTube from 'react-youtube';
import styles from './styles.css';

class PlayerBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlist: [],
      video: 'iV5VKdcQOJE'
    };
  }

  componentDidMount() {
    this.fetchPlaylist();
  }

  fetchPlaylist() {
    let data = [
      {youtube: {video_id: 'yxHw2CmdI9A', title:'Test 1', duration: '3:00'}, facebook: {post_id:'123', user_id:'123', user: 'Bruno Luiz', likes:12}},
      {youtube: {video_id: 'iV5VKdcQOJE', title:'Test 2', duration: '3:00'}, facebook: {post_id:'123', user_id:'123', user: 'Bruno Luiz', likes:12}},
    ];

    this.setState({playlist: data});
  }

  playlistItemClickHandler(item) {
    console.log(item);
    console.log(this);
    this.setState({video: item.youtube.video_id});
  }

  render() {
    var yt = {
      playerVars: {
        autoplay: 1
      }
    };

    return(
      <div className='container'>
        <div className='row'>
          <div className='col-lg-7'>
            <div className="embed-responsive embed-responsive-16by9">
              <YouTube
                className='player'
                videoId={this.state.video}
                opts={yt}
              />
            </div>
          </div>
          <div className='col-lg-5'>
            <PlaylistList
              items={this.state.playlist}
              onClickHandler={this.playlistItemClickHandler.bind(this)}
              />
          </div>
        </div>
      </div>
    );
  }
}
 export default PlayerBox;
