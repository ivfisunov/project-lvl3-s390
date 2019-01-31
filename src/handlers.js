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
    state.addUrl(state.inputUrl);
    document.getElementById('input-url').value = '';
    readFeed(state);
  });
};
