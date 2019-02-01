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

const readFeed = (state) => {
  const loadIcon = document.getElementById('load-icon');
  axios.get(`https://cors-anywhere.herokuapp.com/${state.inputUrl}`)
    .then((feed) => {
      loadIcon.style.visibility = 'hidden';
      state.addFeed(parseRSS(feed));
      state.setInputUrl('');
      document.getElementById('input-url').disabled = false;
      document.getElementById('input-url').value = '';
    })
    .catch((err) => {
      loadIcon.style.visibility = 'hidden';
      document.getElementById('input-url').disabled = false;
      state.setError(err);
    });
};

export default readFeed;
