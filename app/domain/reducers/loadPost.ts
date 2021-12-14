import loadPost from '../events/loadPost';
import type { ApplicationState } from '../ApplicationState';
import { PayloadAction } from '@reduxjs/toolkit';
import type { Post } from '../models/Post';
import { flow, concat, uniq } from 'lodash/fp';

export default (state: ApplicationState, action: PayloadAction<Post>): ApplicationState => {
  if (loadPost.fulfilled.match(action)) {
    return ({
      ...state,
      posts: {
        ...state.posts,
        ids: flow(
          concat(action.payload.slug),
          uniq,
        )(state.posts.ids),
        entities: {
          ...state.posts.entities,
          [action.payload.slug]: {
            ...state.posts.entities[action.payload.slug],
            content: action.payload.content,
          },
        }
      },
    });
  };

  return state;
}