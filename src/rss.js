import axios from 'axios';
import * as consts from './constants';

const parseRSS = (feed) => {
  const parser = new DOMParser();
  const document = parser.parseFromString(feed.data, 'application/xml');
  const feedTitle = document.querySelector('title').textContent;
  const feedDescription = document.querySelector('description').textContent;
  const items = document.querySelectorAll('item');
  const feedItems = [...items].map((item) => {
    const itemTitle = item.querySelector('title').textContent;
    const itemDescription = item.querySelector('description').textContent;
    const itemLink = item.querySelector('link').textContent;
    const allItems = { itemTitle, itemDescription, itemLink };
    return allItems;
  });
  return { feedTitle, feedDescription, feedItems };
};

const reloadFeed = (state) => {
  axios.all(state.urls.map(link => axios.get(`${consts.corsProxyLink}${link}`)))
    .then((allFeeds) => {
      const newFeeds = allFeeds.reduce((acc, feed) => [parseRSS(feed), ...acc], []);
      state.reloadFeeds(newFeeds);
      // console.log(newFeeds);
      setTimeout(reloadFeed, 5000, state);
    });
};

const readFeed = (state) => {
  state.setStatus('loading...');
  axios.get(`${consts.corsProxyLink}${state.inputUrl}`)
    .then((feed) => {
      if (state.urls.length === 0) {
        setTimeout(reloadFeed, 5000, state);
      }
      state.addUrl(state.inputUrl);
      state.addFeed(parseRSS(feed));
      state.setInputUrl('');
      state.setStatus('loaded');
    })
    .catch((err) => {
      state.setStatus('error');
      state.setError(err);
    });
};

export default readFeed;
