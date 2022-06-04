import { Dispatch } from 'redux';

const customDispatch = (params: any) => async (dispatch: Dispatch) => {
  dispatch(params as any);
};

export default customDispatch;
