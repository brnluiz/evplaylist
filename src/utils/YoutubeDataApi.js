import axios from 'axios';

export default class YoutubeDataApi {
  constructor(apiKey = '') {
    this.apiKey = apiKey;
    this.batch = new Array();
  }

  isUrl(string) {
    var pattern = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-]*)?\??(?:[\-\+=&;%@\.\w]*)#?(?:[\.\!\/\\\w]*))?)/g;
    return (string.match(pattern)) ? true : false;
  }

  // Return the ID of the video or false (in case that it is not a youtube url)
  getIdFromUrl(url) {
    let pattern = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    return (url.match(pattern)) ? RegExp.$1 : false;
  }

  insert(data) {
    // If it is an URI, get the ID, otherwise just set the data as the ID
    let id = (this.isUrl(data)) ? getIdFromUrl(data) : data;

    (data) ? this.batch.push(id) : false;
  }

  clear() {
    // Clear the batch
    this.batch = new Array();
  }

  fetch() {
    let data = this.batch.reduce((final, actual, index) => {
      return final + ',' + actual;
    });

    return this.get(data);
  }

  get(id) {
    let url = 'https://www.googleapis.com/youtube/v3/videos?'+
    'id='+id+
    '&key='+this.apiKey+
    '&maxResults='+50+
    '&part=snippet,contentDetails,status';

    return axios.get(url);
  }
}
