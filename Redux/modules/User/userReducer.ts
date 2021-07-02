import { createAction, handleActions } from 'redux-actions';

import { getAsyncState, createAsyncActions, handleAsyncActions } from '../../../Util/reducer.util';
import { concatData } from '../../../Util/dataFormatter';

const initialState = {
  user: getAsyncState.initial([]),
};

export const userActions = {
  FETCH_USER: 'user/FETCH_USER',
};

export const userActionCreator = {
  fetchUser: createAsyncActions(userActions, 'FETCH_USER'),
};

const userReducer = handleActions(
  {
    ...handleAsyncActions(
      userActions.FETCH_USER,
      'user',
      concatData
      )
  },
  initialState
)

export default userReducer;
