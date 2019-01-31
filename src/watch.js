import { watch } from 'melanke-watchjs';
import validator from 'validator';
import { renderFeed, renderError } from './render';

const watchState = (state) => {
  watch(state, 'inputUrl', () => {
    if (state.inputUrl === '') {
      state.setInputUrlValid('');
    } else if (!validator.isURL(state.inputUrl)) {
      state.setInputUrlValid('invalid');
    } else if (state.urls.includes(state.inputUrl)) {
      state.setInputUrlValid('invalid');
    } else {
      state.setInputUrlValid('valid');
    }
  });

  watch(state, 'inputUrlValid', () => {
    const inputUrl = document.getElementById('input-url');
    const button = document.getElementById('button');
    if (state.inputUrlValid === '') {
      inputUrl.classList.remove('is-valid');
      inputUrl.classList.remove('is-invalid');
      inputUrl.classList.add('form-control-no-border');
      button.disabled = true;
    } else if (state.inputUrlValid === 'invalid') {
      inputUrl.classList.remove('is-valid');
      inputUrl.classList.add('is-invalid');
      button.disabled = true;
    } else {
      inputUrl.classList.add('is-valid');
      inputUrl.classList.remove('is-invalid');
      button.disabled = false;
    }
  });

  watch(state, 'feeds', () => {
    renderFeed(state);
  });

  watch(state, 'error', () => {
    renderError(state);
  });
};

export default watchState;
