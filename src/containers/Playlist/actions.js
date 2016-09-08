import * as type from './constants';
import thunk from 'redux-thunk';
import * as keys from 'config/keys';

import FacebookPromises from 'utils/FacebookPromises';
import YoutubeDataApi from 'utils/YoutubeDataApi';
let testQuery = '/1120426798025135/feed?fields=id,link,likes.limit(0).summary(true),from&limit=1000';

export const setFbToken = (token) => {
  return {
    type: type.SETUP,
    fbtoken: token
  }
}

export const fetch = () => {
  return (dispatch, getState) => {
    console.log(getState().playlist);
    let token = getState().playlist.get('fbtoken');
    let fb = new FacebookPromises(token);
    let yt = new YoutubeDataApi(keys.YT_API_KEY);

    fb.get(testQuery).then(function(res) {
      let posts = res.data.filter((obj, pos) => {
        // Removes posts without links
        if (!obj.link) return false;

        // Check if it is a youtube url
        if (!yt.id(obj.link)) return false;

        // Filter duplicate objects
        if (res.data.indexOf(obj) != pos) return false;

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
        let playlist = videos.map((video, index) => {

          // Search for the first Facebook post related to the video
          let relatedPost = posts.filter((post) => {
            return (post.video_id === video.id) ? true : false;
          })[0];

          // Add the missing data to the related post
          relatedPost.index    = index;
          relatedPost.title    = video.snippet.localized.title;
          relatedPost.duration = yt.duration(video.contentDetails.duration);

          return relatedPost;
        });
        console.log(playlist);

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
