import axios from 'axios';

import { LOAD_POST } from './actionTypes';

export default (slug, filename) => (
  dispatch => filename && axios.get(`posts/${filename}`)
    .then((res) => {
      dispatch({
        type: LOAD_POST,
        slug,
        content: res.data,
      });
    }));
