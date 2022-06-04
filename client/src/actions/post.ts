import axios from 'axios';
import { Dispatch } from 'redux';
import { setAlert } from './alert';
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from './types';
import customDispatch from './customDispatch';

export const getPosts = () => async (dispatch: Dispatch) => {
  try {
    const res = await axios.get('/api/posts');

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err: any) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};

export const addLike = (id: number) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err: any) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};

export const removeLike = (id: number) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err: any) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};

export const deletePost = (id: number) => async (dispatch: Dispatch) => {
  try {
    await axios.delete(`/api/posts/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: { id },
    });

    customDispatch(setAlert('Post Removed', 'success'));
  } catch (err: any) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};

export const addPost = (formData: JSON) => async (dispatch: Dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post('/api/posts', formData, config);

    dispatch({
      type: ADD_POST,
      payload: res.data,
    });

    customDispatch(setAlert('Post Created', 'success'));
  } catch (err: any) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};

export const getPost = (id: number) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${id}`);

    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err: any) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};

export const addComment = (postId: number, formData: JSON) => async (dispatch: Dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post(
      `/api/posts/comment/${postId}`,
      formData,
      config,
    );

    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });

    customDispatch(setAlert('Comment added', 'success'));
  } catch (err: any) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};

export const deleteComment = (postId: number, commentId: number) => async (dispatch: Dispatch) => {
  try {
    await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });

    customDispatch(setAlert('Comment removed', 'success'));
  } catch (err: any) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};
