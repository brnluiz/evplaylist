import React from 'react';
import {Component, PropTypes} from 'react';

import PlaylistList from 'components/PlaylistList';
import YouTube from 'react-youtube';
import styles from './styles.css';

class PlayerBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlist: []
    };
  }

  componentDidMount() {
    this.fetchPlaylist();
  }

  fetchPlaylist() {
    let data = [
      {youtube: {video_id: '123', title:'Test 1', duration: '3:00'}, facebook: {post_id:'123', user_id:'123', user: 'Bruno Luiz', likes:12}},
      {youtube: {video_id: '123', title:'Test 2', duration: '3:00'}, facebook: {post_id:'123', user_id:'123', user: 'Bruno Luiz', likes:12}},
    ];

    this.setState({playlist: data});
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
            <div class="embed-responsive embed-responsive-16by9">
              <YouTube
                className='player'
                videoId="yxHw2CmdI9A"
                opts={yt}
              />
            </div>
          </div>
          <div className='col-lg-5'>
            <PlaylistList items={this.state.playlist} />
          </div>
        </div>
      </div>
    );
  }
}
 export default PlayerBox;
