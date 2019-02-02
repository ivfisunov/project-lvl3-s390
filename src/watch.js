import { watch } from 'melanke-watchjs';
import {
  renderFeed, renderError, renderInputForm, setInputStatus,
} from './render';

const watchState = (state) => {
  watch(state, 'inputUrl', () => {
    setInputStatus(state);
  });

  watch(state, 'inputUrlStatus', () => {
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
