import readFeed from './rss';

export const inputHandler = (state) => {
  const input = document.getElementById('input-url');
  input.addEventListener('input', (e) => {
    state.setInputUrl(e.target.value);
  });
};

export const buttonHandler = (state) => {
  const button = document.getElementById('button');
  button.addEventListener('click', () => {
    state.setInputUrlStatus('loading...');
    readFeed(state);
  });
};
