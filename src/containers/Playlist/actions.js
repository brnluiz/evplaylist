import * as type from './constants';
import thunk from 'redux-thunk';
import * as keys from 'config/keys';

import FacebookPromises from 'utils/FacebookPromises';
import YoutubeDataApi from 'utils/YoutubeDataApi';

const makeQuery = (id) => {
    return '/' + id +'/feed?fields=id,link,likes.limit(0).summary(true),from&limit=1000';
}

export const setFbToken = (token) => {
  return {
    type: type.SETUP,
    fbtoken: token
  }
}

export const isLoading = (status) => {
  return {
    type: type.UPDATE_STATUS_LOADING,
    status: status
  }
}

export const fetch = (id) => {
  return (dispatch, getState) => {
    dispatch({
      type: type.UPDATE_STATUS_LOADING,
      status: true
    });

    let token = getState().playlist.get('fbtoken');
    let fb = new FacebookPromises(token);
    let yt = new YoutubeDataApi(keys.YT_API_KEY);

    let query = makeQuery(id);
    fb.get(query).then(function(res) {
      let posts = res.data.filter((obj, pos, origin) => {
        // Removes posts without links
        if (!obj.link) return false;

        // Check if it is a youtube url
        if (!yt.id(obj.link)) return false;

        // Filter duplicate objects
        let firstPost = origin.map(mapObj => mapObj.link).indexOf(obj.link);
        if (firstPost != pos) return false;

        return true;
      })
      .map((obj, index) => {
        // Insert the video ID to the youtube batch (will be processed later)
        // This will enable the program to get the video info later on
        yt.insert(yt.id(obj.link));

        // Return the mapped data
        return {
          id: index,
          video_id: yt.id(obj.link),
          post_id: obj.id,
          user_id: obj.from.id,
          user: obj.from.name,
          title: '',
          duration: '0:00',
          post_likes: obj.likes.summary.total_count
        };
      });
      
      return posts;
    })
    .then(function(posts){
      let ytBatch = yt.fetch();

      // TODO: this feels smelly | promisse inside a promisse
      // Process all promises and it's agregated data
      ytBatch.then((videos) => {
        // Integrate the youtube data with the facebook data
        let playlist = videos
        .filter((obj, pos, origin) => {
          let firstVideo = origin.map(mapObj => mapObj.id).indexOf(obj.id);
          if (firstVideo != pos) return false;

          return true;
        })
        .map((video, index) => {
          // Search for the first Facebook post related to the video
          let relatedPost = posts.filter((post) => {
            return (post.video_id === video.id) ? true : false;
          })[0];

          // Add the missing data to the related post
          // relatedPost.id       = index;
          relatedPost.title    = video.snippet.localized.title;
          relatedPost.duration = yt.duration(video.contentDetails.duration);

          return relatedPost;
        });

        dispatch({
          type: type.FETCH,
          items: playlist
        });
      });
    });
  }
}

// export function click(item) {
//   return (dispatch, getState) => {
//     let player = getState().player;
//     return {
//       type: type.CLICK,
//       item: item,
//       player: player
//     }
//   };
// }
