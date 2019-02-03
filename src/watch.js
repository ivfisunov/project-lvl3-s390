import { watch } from 'melanke-watchjs';
import {
  renderFeed, renderError, renderStatus, renderInput,
} from './render';

const watchState = (state) => {
  watch(state, 'inputUrl', () => {
    renderInput(state);
  });

  watch(state, 'status', () => {
    renderStatus(state);
  });

  watch(state, 'feeds', () => {
    renderFeed(state);
  });

  watch(state, 'error', () => {
    renderError(state);
  });
};

export default watchState;
