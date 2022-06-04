import axios from 'axios';
import { Dispatch } from 'redux';
import { setAlert } from './alert';
import {
  FORM_ERROR,
  GET_COMPANIES,
  GET_FORM,
  GET_COMPANY,
  ADD_COMPANY,
  ADD_FORM,
  ADD_RESPONSE,
  GET_QUESTIONS,
  GET_RESPONSES,
  GET_RESPONSE,
  REMOVE_FORM,
  REMOVE_COMPANY,
  REMOVE_RESPONSE,
} from './types';
import customDispatch from './customDispatch';

export const addCompany = (formData: JSON) => async (dispatch: Dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post('/api/forms', formData, config);

    dispatch({
      type: ADD_COMPANY,
      payload: res.data,
    });

    customDispatch(setAlert('Company Created', 'success'));
  } catch (err: any) {
    dispatch({
      type: FORM_ERROR,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};

export const getCompanies = () => async (dispatch: Dispatch) => {
  try {
    const res = await axios.get('/api/forms');
    dispatch({
      type: GET_COMPANIES,
      payload: res.data,
    });
  } catch (err: any) {
    dispatch({
      type: FORM_ERROR,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};

export const removeCompany = (company: string) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.delete(`/api/forms/${company}`);

    dispatch({
      type: REMOVE_COMPANY,
      payload: res.data,
    });
  } catch (err: any) {
    dispatch({
      type: FORM_ERROR,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};

export const getCompanyForms = (company: string) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.get(`/api/forms/${company}`);
    dispatch({
      type: GET_COMPANY,
      payload: res.data,
    });
  } catch (err: any) {
    dispatch({
      type: FORM_ERROR,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};

export const addCompanyForm = (company: string, formData: JSON) => async (dispatch: Dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post(`/api/forms/${company}`, formData, config);

    dispatch({
      type: ADD_FORM,
      payload: res.data,
    });

    customDispatch(setAlert('Form Created', 'success'));
  } catch (err: any) {
    dispatch({
      type: FORM_ERROR,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};

export const getForm = (company: string, id: number) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.get(`/api/forms/${company}/${id}`);
    dispatch({
      type: GET_FORM,
      payload: res.data,
    });
  } catch (err: any) {
    dispatch({
      type: FORM_ERROR,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};

export const removeForm = (company: string, id: number) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.delete(`/api/forms/${company}/${id}`);

    dispatch({
      type: REMOVE_FORM,
      payload: res.data,
    });
    customDispatch(setAlert('Form Removed', 'success'));
  } catch (err: any) {
    window.location.reload();
    dispatch({
      type: FORM_ERROR,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};

export const addResponseToForm = (company: string, id: number, formData: JSON, fileData: JSON) => async (
  dispatch: Dispatch,
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const responses = { responses: formData, file: fileData };

    const res = await axios.post(
      `/api/forms/res/${company}/${id}`,
      responses,
      config,
    );

    dispatch({
      type: ADD_RESPONSE,
      payload: res.data,
    });

    customDispatch(setAlert('Response send', 'success'));
  } catch (err: any) {
    dispatch({
      type: FORM_ERROR,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};

export const getQuestions = (company: string, id: number) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.get(`/api/forms/asks/${company}/${id}`);
    dispatch({
      type: GET_QUESTIONS,
      payload: res.data,
    });
  } catch (err: any) {
    dispatch({
      type: FORM_ERROR,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};

export const getResponses = (company: string, id: number) => async (dispatch: Dispatch) => {
  try {
    const responses = await axios.get(`/api/forms/res/${company}/${id}`);
    dispatch({
      type: GET_RESPONSES,
      payload: responses.data,
    });
  } catch (err: any) {
    dispatch({
      type: FORM_ERROR,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};

export const getOneResponse = (company:string, id: number, res: string) => async (dispatch: Dispatch) => {
  try {
    const responses = await axios.get(`/api/forms/res/${company}/${id}/${res}`);
    dispatch({
      type: GET_RESPONSE,
      payload: responses.data,
    });
  } catch (err: any) {
    dispatch({
      type: FORM_ERROR,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};

export const removeResponse = (company:string, id:number, response: string) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.delete(
      `/api/forms/res/${company}/${id}/${response}`,
    );

    dispatch({
      type: REMOVE_RESPONSE,
      payload: res.data,
    });
  } catch (err: any) {
    dispatch({
      type: FORM_ERROR,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};
