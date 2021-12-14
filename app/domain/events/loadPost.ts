import axios from 'axios';
import { get } from 'lodash/fp';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../models/Post';
import { ApplicationState } from '../ApplicationState';

export default createAsyncThunk<
  Post,
  string,
  { state: ApplicationState }
>(
  'posts/load-post',
  (
    slug: string,
    {
      getState,
    }
  ) => {
    const { filename } = getState().posts.entities[slug];

    return axios.get(`/posts/${filename}`)
      .then(res => ({
        slug,
        filename,
        content: get('data', res),
      }));
  });
