import readFeed from './rss';

export const inputHandler = (state) => {
  const input = document.getElementById('input-url');
  input.addEventListener('input', (e) => {
    state.setInputUrl(e.target.value);
  });
};

export const buttonHandler = (state) => {
  const button = document.getElementById('button');
  const loadIcon = document.getElementById('load-icon');
  const input = document.getElementById('input-url');
  button.addEventListener('click', () => {
    state.addUrl(state.inputUrl);
    input.disabled = true;
    loadIcon.style.visibility = 'visible';
    readFeed(state);
  });
};
