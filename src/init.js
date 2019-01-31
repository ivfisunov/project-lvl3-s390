import watchState from './watch';
import { inputHandler, buttonHandler } from './handlers';
import StateApplication from './state';

export default () => {
  const state = new StateApplication();
  watchState(state);
  inputHandler(state);
  buttonHandler(state);
};
