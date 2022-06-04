import { v4 as uuidv4 } from 'uuid';
import { Dispatch } from 'redux';
import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (msg: string, alertType: string, timeout = 5000) => (dispatch: Dispatch) => {
  const id = uuidv4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
