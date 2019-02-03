import axios from 'axios';
import * as consts from './constants';

const parseRSS = (feed) => {
  const parser = new DOMParser();
  const document = parser.parseFromString(feed.data, 'application/xml');
  if (!document.querySelector('channel')) {
    throw new Error('There is an error reading feed.');
  }
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

export const updateFeed = (state) => {
  axios.all(state.urls.map(link => axios.get(`${consts.corsProxyLink}${link}`)))
    .then((allFeeds) => {
      const newFeeds = allFeeds.reduce((acc, feed) => [parseRSS(feed), ...acc], []);
      state.reloadFeeds(newFeeds);
      console.log(newFeeds);
    })
    .catch((err) => {
      state.setStatus('error');
      state.setError(err);
    })
    .finally(() => {
      setTimeout(updateFeed, 5000, state);
    });
};

const addNewFeed = (state) => {
  state.setStatus('loading');
  axios.get(`${consts.corsProxyLink}${state.inputUrl}`)
    .then((feed) => {
      state.addUrl(state.inputUrl);
      state.setInputUrl('');
      state.addFeed(parseRSS(feed));
    })
    .catch((err) => {
      state.setStatus('error');
      state.setError(err);
    })
    .finally(() => {
      state.setStatus('loaded');
    });
};

export default addNewFeed;
