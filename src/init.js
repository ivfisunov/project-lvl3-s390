import watchState from './watch';
import { inputHandler, buttonHandler } from './handlers';
import State from './state';

export default () => {
  const state = new State();
  watchState(state);
  inputHandler(state);
  buttonHandler(state);
};
