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
  id(url) {
    let pattern = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|shared\?ci=|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
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
    // Prepare the Axios batch
    let axiosBatch = this.batch.reduce((final, actual, index) => {
      // Reduce the whole array to string batches, each one with 50 id's
      let batch = Math.floor(index/50);
      final[batch] = (!final[batch]) ? actual : (final[batch] + ',' + actual);

      return final;
    }, [])
    .map((obj) => {
      // Prepare all axios get requests to be used on axios.all()
      return this.get(obj);
    });

    // Execute the batch and then map-reduce the resulting arrays to a single one
    let res = axios.all(axiosBatch).then((data) => {
      let join = data.map((obj) => {
        return obj.data.items;
      })
      .reduce((final, actual) => {
        return final.concat(actual);
      }, []);

      return join;
    });

    return res;
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
