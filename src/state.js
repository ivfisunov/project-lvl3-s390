export default class State {
  constructor() {
    this.inputUrl = '';
    this.status = '';
    this.feeds = [];
    this.urls = [];
    this.error = '';
  }

  setInputUrl(url) {
    this.inputUrl = url;
  }

  setStatus(status) {
    this.status = status;
  }

  addUrl(url) {
    this.urls = [...this.urls, url];
  }

  addFeed(feed) {
    this.feeds = [feed, ...this.feeds];
  }

  reloadFeeds(feeds) {
    this.feeds = feeds;
  }

  setError(err) {
    this.error = err;
  }
}
