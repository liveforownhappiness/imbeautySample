import AsyncStorage from '@react-native-community/async-storage';
import { createAction, handleActions } from 'redux-actions';
import { persistReducer, PURGE } from 'redux-persist';

import {
  createAsyncActions,
  getAsyncState,
  handleAsyncActions,
  setValueReducer
} from '../../../Util/reducer.util';

export const homeInitialState = {
  homes: getAsyncState.initial({ }),
};

export const homeActions = {
  SET_VALUE: '@home/SET_VALUE',
  FETCH_HOMES: '@home/FETCH_HOMES',
};

export const homeActionCreator = {
  setValue: createAction(homeActions.SET_VALUE),
  fetchHomes: createAsyncActions(homeActions, 'FETCH_HOMES'),
};

const homeReducer = handleActions(
  {
    [homeActions.SET_VALUE]: setValueReducer,
    ...handleAsyncActions(homeActions.FETCH_HOMES, 'homes'),
    [PURGE]: () => homeInitialState,
  },
  homeInitialState,
);

const persistConfig = {
  key: 'home',
  storage: AsyncStorage,
};

export default persistReducer(persistConfig, homeReducer);
