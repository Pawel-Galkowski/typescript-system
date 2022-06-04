import axios from 'axios';
import { Dispatch } from 'redux';
import { setAlert } from './alert';
import { AppDispatch } from '../store';

import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  GET_PROFILES,
  GET_EXPERIENCE,
  GET_EDUCATION,
  GET_REPOS,
  POST_EXPERIENCE,
  ACCOUNT_DELETED2,
  CLEAR_USERS,
  GET_USERS,
  USERS_ERROR,
  POST_EDUCATION,
  ALL_USERS,
} from './types';
import customDispatch from './customDispatch';

export const getCurrentProfile = () => async (AppDispatch: Dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');

    AppDispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err: any) {
    AppDispatch({ type: CLEAR_PROFILE });
    AppDispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getCurrentExperience = (ExpId: number) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.get(`/api/profile/experience/${ExpId}`);

    dispatch({
      type: GET_EXPERIENCE,
      payload: res.data,
    });
  } catch (err: any) {
    dispatch({ type: CLEAR_PROFILE });
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const setCurrentExperience = (ExpId: number, formData: JSON) => async (dispatch: Dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post(
      `/api/profile/experience/${ExpId}`,
      formData,
      config,
    );

    dispatch({
      type: POST_EXPERIENCE,
      payload: res.data,
    });
  } catch (err: any) {
    dispatch({ type: CLEAR_PROFILE });
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getCurrentEducation = (EduId: number) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.get(`/api/profile/education/${EduId}`);

    dispatch({
      type: GET_EDUCATION,
      payload: res.data,
    });
  } catch (err: any) {
    dispatch({ type: CLEAR_PROFILE });
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const setCurrentEducation = (EduId: number, formData: JSON) => async (dispatch: Dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post(
      `/api/profile/education/${EduId}`,
      formData,
      config,
    );
    dispatch({
      type: POST_EDUCATION,
      payload: res.data,
    });
  } catch (err: any) {
    dispatch({ type: CLEAR_PROFILE });
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getProfiles = () => async (dispatch: Dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios.get('/api/profile');

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err: any) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};

export const getUsers = () => async (dispatch: Dispatch) => {
  dispatch({ type: CLEAR_USERS });
  try {
    const res = await axios.get('/api/profile/getusers');

    dispatch({
      type: GET_USERS,
      payload: res.data,
    });
  } catch (err: any) {
    dispatch({
      type: USERS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getAllusers = () => async (dispatch: Dispatch) => {
  dispatch({ type: CLEAR_USERS });
  try {
    const res = await axios.get('/api/profile/getAllusers');

    dispatch({
      type: ALL_USERS,
      payload: res.data,
    });
  } catch (err: any) {
    dispatch({
      type: USERS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getProfileById = (userId: number) => async (dispatch: Dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err: any) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getGithubRepos = (username: string) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`);

    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (err: any) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const createProfile = (formData: JSON, history: Array<string>, edit = false) => async (
  dispatch: Dispatch,
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res:any = axios.post('/api/profile', formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    customDispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err: any) {
    const { errors } = err.response.data;

    if (errors) {
      errors.forEach((error: any) => customDispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addExperience = (formData: JSON, history: Array<string>) => async (dispatch: Dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res:any = axios.put('/api/profile/experience', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    customDispatch(setAlert('Experience Added', 'success'));
    history.push('/dashboard');
  } catch (err: any) {
    const { errors } = err.response.data;

    if (errors) {
      errors.forEach((error: any) => customDispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const editEducation = (formData: JSON, history: Array<string>, edit: boolean = false) => async (
  dispatch: Dispatch,
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res: any = axios.post('/api/profile/education', formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    customDispatch(setAlert(edit ? 'Profile Updated' : 'Education Added', 'success'));

    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err: any) {
    const { errors } = err.response.data;

    if (errors) {
      errors.forEach((error: any) => customDispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addEducation = (formData: JSON, history: Array<string>) => async (dispatch: Dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res: any = axios.put('/api/profile/education', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    customDispatch(setAlert('Education Added', 'success'));
    history.push('/dashboard');
  } catch (err: any) {
    const { errors } = err.response.data;

    if (errors) {
      errors.forEach((error: any) => customDispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteExperience = (id: number) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    customDispatch(setAlert('Experience Removed', 'success'));
  } catch (err: any) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteEducation = (id: number) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    customDispatch(setAlert('Education Removed', 'success'));
  } catch (err: any) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteUserAccount = (userId: number) => async (dispatch: Dispatch) => {
  if (window.confirm('Are you sure?')) {
    try {
      await axios.delete(`/api/profile/${userId}`);

      dispatch({
        type: CLEAR_PROFILE,
      });

      dispatch({
        type: ACCOUNT_DELETED2,
      });

      customDispatch(setAlert('Account permamently deleted', 'warning'));
    } catch (err: any) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

export const deleteAccount = () => async (dispatch: Dispatch) => {
  if (window.confirm('Are you sure?')) {
    try {
      await axios.delete('/api/profile/');

      dispatch({
        type: CLEAR_PROFILE,
      });

      dispatch({
        type: ACCOUNT_DELETED,
      });

      customDispatch(setAlert('Account permamently deleted', 'warning'));
    } catch (err: any) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
