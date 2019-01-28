import Example from './example';

export default () => {
  const element = document.getElementById('point');
  const obj = new Example(element);
  obj.init();
};
