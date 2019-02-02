export default class State {
  constructor() {
    this.inputUrl = '';
    this.inputUrlStatus = '';
    this.feeds = [];
    this.urls = [];
    this.error = '';
  }

  setInputUrl(url) {
    this.inputUrl = url;
  }

  setInputUrlStatus(status) {
    this.inputUrlStatus = status;
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
