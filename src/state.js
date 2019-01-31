export default class StateApplication {
  constructor() {
    this.inputUrl = '';
    this.inputUrlValid = '';
    this.feeds = [];
    this.urls = [];
    this.error = '';
  }

  setInputUrl(url) {
    this.inputUrl = url;
  }

  setInputUrlValid(status) {
    this.inputUrlValid = status;
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
