import axios from 'axios';

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
  axios.all(state.urls.map(link => axios.get(`https://cors-anywhere.herokuapp.com/${link}`)))
    .then(([...allFeeds]) => {
      // let newFeeds = [];
      // allFeeds.forEach((feed) => {
      //   newFeeds = [parseRSS(feed), ...newFeeds];
      // });
      const newFeeds = allFeeds.reduce((acc, feed) => [parseRSS(feed), ...acc], []);
      state.reloadFeeds(newFeeds);
      setTimeout(reloadFeed, 5000, state);
    })
    .catch((err) => {
      state.setError(err);
    });
};

const readFeed = (state) => {
  axios.get(`https://cors-anywhere.herokuapp.com/${state.inputUrl}`)
    .then((feed) => {
      state.addUrl(state.inputUrl);
      state.addFeed(parseRSS(feed));
      state.setInputUrl('');
      setTimeout(reloadFeed, 5000, state);
    })
    .catch((err) => {
      state.setInputUrlStatus('valid');
      state.setError(err);
    });
};

export default readFeed;
