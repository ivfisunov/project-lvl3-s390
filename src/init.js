import watchState from './watch';
import { inputHandler, buttonHandler } from './handlers';
import State from './State';
import { updateFeed } from './rss';

export default () => {
  const state = new State();
  watchState(state);
  inputHandler(state);
  buttonHandler(state);
  updateFeed(state);
};
