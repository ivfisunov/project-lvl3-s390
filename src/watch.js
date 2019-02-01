import { watch } from 'melanke-watchjs';
import {
  renderFeed, renderError, renderInputForm,
} from './render';

const watchState = (state) => {
  watch(state, 'inputUrl', () => {
    renderInputForm(state);
  });

  watch(state, 'feeds', () => {
    renderFeed(state);
  });

  watch(state, 'error', () => {
    renderError(state);
  });
};

export default watchState;
