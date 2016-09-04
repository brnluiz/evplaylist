import React from 'react';
import {Component, PropTypes} from 'react';

import PlaylistList from 'components/PlaylistList';
import YouTube from 'react-youtube';
import styles from './styles.css';
import store from 'config/store';
import {nextMusic} from './actions';

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
// iV5VKdcQOJE
  fetchPlaylist() {
    let data = [
      {
        video_id: 'yxHw2CmdI9A',
        post_id: '123',
        user_id: '456',
        user_name: 'Bruno Luiz da Silva',
        title: '505 lyrics - Arctic Monkeys',
        duration: '3:00',
        post_likes: 12
      }
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
        autoplay: 0
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
