import graph from 'fb-react-sdk';

export default class FacebookPromises {
  constructor(token) {
    this.setAccessToken(token);
  }

  setAccessToken(token) {
    graph.setAccessToken(token);
  }

  setVersion(v) {
    graph.setVersion(v);
  }

  get(query) {
    return new Promise((resolve, reject) => {
        graph.get(query, (err, res) => (err) ? reject(err) : resolve(res));
    });
  }
}
