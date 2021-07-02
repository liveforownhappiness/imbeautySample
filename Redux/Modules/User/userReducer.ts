import { createAction, handleActions } from 'redux-actions';
import { PURGE } from 'redux-persist';
import {
  createAsyncActions,
  handleAsyncActions,
  setValueReducer
} from '../../../Util/reducer.util';

export const userInitialState = {
  user_info: {}
};

export const userActions = {
  SET_VALUE: '@user/SET_VALUE',
  FETCH_USER: '@user/FETCH_USER',
};

export const userActionCreator = {
  setValue: createAction(userActions.SET_VALUE),
  fetchUser: createAsyncActions(userActions, 'FETCH_USER'),
};

const userReducer = handleActions(
  {
    [userActions.SET_VALUE]: setValueReducer,
    ...handleAsyncActions(userActions.FETCH_USER, 'user', (a, b) => ({})),
    [PURGE]: () => userInitialState,
  },
  userInitialState,
);

export default userReducer;
