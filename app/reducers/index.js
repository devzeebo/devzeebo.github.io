import loadPost from './loadPost';

import defaultState from '../posts';

const reducers = [loadPost].reduce((m, it) => ({
  ...m,
  [it.type]: it.func,
}), {});

export default (state = defaultState, action) => {
  const reducer = reducers[action.type];
  return (reducer && reducer(state, action)) || state;
};
