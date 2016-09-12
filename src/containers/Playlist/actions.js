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

const makeQuery = (id) => {
    return '/' + id +'/feed?fields=id,link,likes.limit(0).summary(true),from&limit=1000';
}

const sortByLikes = (a,b) => {
  return (b.post_likes - a.post_likes);
}

export const getEventId = (str) => {
  // If it is a number, probably it is the event id itself
  if(isNumeric(str)) return str;

  if(str == undefined) throw 'The search field is empty';

  // If it is not an URL, then discard it
  if(!isUrl(str) || str == undefined) throw 'The search field does not contain an URL';

  // Get the URL parameters
  let parser = document.createElement('a');
  parser.href = str;
  let pathname = parser.pathname;
  let pathParams = pathname.split('/');
  let host = parser.host;

  // TODO: throw an error
  if (host.indexOf('facebook') === -1) throw 'The search field does not contain a Facebook URL';

  // Check if it is an event and returns it's id
  if(pathParams[1] == 'events' && isNumeric(pathParams[2])) {
    return pathParams[2];
  }

  // Else, just get the first number and return it
  let regex = /(\d+)/g; // regex to get only numbers
  let numbersFromUrl = str.match(regex);
  if (numbersFromUrl[0] === undefined) throw 'The search field does not contain a valid Facebook Event ID';
  return numbersFromUrl[0];
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
    let title = '';
    try {
      id = getEventId(q);
    } catch (e) {
      dispatch({ type: type.ERROR, message: e });
      return ;
    }

    let yt = new YoutubeDataApi(keys.YT_API_KEY);

    Facebook.get(id+'?fields=name').then(res => {
      // Get the event title and build the query to get the post list
      title = res.name;
      return makeQuery(id);
    }, err => { throw err; })
    .then(query => Facebook.get(query), err => { throw err; })
    .then(res => {
      // Manipulate the post list
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
    }, err => { throw err; })
    .then(posts => {
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
          relatedPost.title    = video.snippet.localized.title;
          relatedPost.duration = time.beautifyYoutube(video.contentDetails.duration);

          return relatedPost;
        });

        playlist = playlist.sort(sortByLikes);

        dispatch({
          type: type.FETCH,
          items: playlist,
          title: title,
          fbid: id
        });
      });
    }, err => { throw err; })
    .catch(error => {
      dispatch({
        type: type.ERROR,
        message: 'Check the passed event URL'
      });
    });
  }
}

export const setError = (message) => {
  return {
    type: type.ERROR,
    message: message
  }
}
