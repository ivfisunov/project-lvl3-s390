export default class State {
  constructor() {
    this.inputUrl = '';
    this.feeds = [];
    this.urls = [];
    this.error = '';
  }

  setInputUrl(url) {
    this.inputUrl = url;
  }

  addUrl(url) {
    this.urls = [...this.urls, url];
  }

  addFeed(feed) {
    this.feeds = [feed, ...this.feeds];
  }

  setError(err) {
    this.error = err;
  }
}
