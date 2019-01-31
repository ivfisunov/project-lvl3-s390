import axios from 'axios';

const rssParser = (feed, state) => {
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
  state.addFeed({ feedTitle, feedDescription, feedItems });
};

const readFeed = (state) => {
  axios.get(`https://cors-anywhere.herokuapp.com/${state.inputUrl}`)
    .then((response) => {
      state.setInputUrl('');
      rssParser(response, state);
    })
    .catch((err) => {
      state.setError(err);
    });
};

export default readFeed;
