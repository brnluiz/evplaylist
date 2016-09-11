import * as type from './constants';
import thunk from 'redux-thunk';
import * as keys from 'config/keys';

import {Facebook} from 'utils/FacebookPromises';
import YoutubeDataApi from 'utils/YoutubeDataApi';
import * as time from 'utils/TimeManipulation';

const isUrl = (str) => {
  let pattern = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-]*)?\??(?:[\-\+=&;%@\.\w]*)#?(?:[\.\!\/\\\w]*))?)/g;
  return (str.match(pattern)) ? true : false;
}

const isNumeric = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export const getEventId = (str) => {
  // If it is a number, probably it is the event id itself
  if(isNumeric(str)) return str;

  if(str == undefined) throw 'not-str';

  // If it is not an URL, then discard it
  if(!isUrl(str) || str == undefined) throw 'not-url';

  // Get the URL parameters
  let parser = document.createElement('a');
  parser.href = str;
  let pathname = parser.pathname;
  let pathParams = pathname.split('/');
  let host = parser.host;

  // TODO: throw an error
  if (host.indexOf('facebook') === -1) throw 'not-facebook';

  // Check if it is an event and returns it's id
  if(pathParams[1] == 'events' && isNumeric(pathParams[2])) {
    return pathParams[2];
  }

  // Else, just get the first number and return it
  let regex = /(\d+)/g; // regex to get only numbers
  let numbersFromUrl = str.match(regex);
  if (numbersFromUrl[0] === undefined) throw 'not-id';
  return numbersFromUrl[0];
}

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

export const fetch = (q) => {
  return (dispatch, getState) => {
    dispatch({
      type: type.UPDATE_STATUS_LOADING,
      status: true
    });

    let id = '';
    try {
      id = getEventId(q);
    } catch (e) {
      console.log(e);
      return ;
    }

    let token = getState().playlist.get('fbtoken');
    let yt = new YoutubeDataApi(keys.YT_API_KEY);

    let query = makeQuery(id);
    Facebook.get(query).then(function(res) {
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
          relatedPost.duration = time.beautifyYoutube(video.contentDetails.duration);

          return relatedPost;
        });
        console.log(playlist);
        dispatch({
          type: type.FETCH,
          items: playlist,
          fbid: id
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
