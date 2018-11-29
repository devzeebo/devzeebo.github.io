import { LOAD_POST } from '../actions/actionTypes';

export default {
  type: LOAD_POST,
  func: (state, action) => ({
    ...state,
    posts: {
      ...state.posts,
      [action.slug]: action.content,
    },
  }),
};
