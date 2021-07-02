import AsyncStorage from '@react-native-community/async-storage';
import { createAction, handleActions } from 'redux-actions';
import { persistReducer, PURGE } from 'redux-persist';
import dataFormatter from '../../../Util/dataFormatter';
import {
  createAsyncActions,
  getAsyncState,
  handleAsyncActions,
  setValueReducer
} from '../../../Util/reducer.util';

export const newsInitialState = {
  newss: getAsyncState.initial({ next: '', previous: '', results: [] }),
  images: [],
  content: '',
  tags: {},
  price: undefined,
  treatment_date: undefined,
  scraps: getAsyncState.initial({ next: '', previous: '', results: [] }),
};

export const newsActions = {
  SET_VALUE: '@news/SET_VALUE',
  REFRESH_REVIEWS: '@news/REFRESH_REVIEWS',
  FETCH_REVIEWS: '@news/FETCH_REVIEWS',
  REFRESH_SCRAPS: '@news/REFRESH_SCRAPS',
  FETCH_SCRAPS: '@news/FETCH_SCRAPS',
};

export const newsActionCreator = {
  setValue: createAction(newsActions.SET_VALUE),
  fetchNewss: createAsyncActions(newsActions, 'REFRESH_REVIEWS'),
  refreshNewss: createAsyncActions(newsActions, 'FETCH_REVIEWS'),
  refreshScraps: createAsyncActions(newsActions, 'REFRESH_SCRAPS'),
  fetchScraps: createAsyncActions(newsActions, 'FETCH_SCRAPS'),
};

const newsReducer = handleActions(
  {
    [newsActions.SET_VALUE]: setValueReducer,
    ...handleAsyncActions(newsActions.REFRESH_REVIEWS, 'newss'),
    ...handleAsyncActions(newsActions.FETCH_REVIEWS, 'newss', dataFormatter.formatfeeds),
    ...handleAsyncActions(newsActions.REFRESH_SCRAPS, 'scraps'),
    ...handleAsyncActions(newsActions.FETCH_SCRAPS, 'scraps', dataFormatter.formatfeeds),
    [PURGE]: () => newsInitialState,
  },
  newsInitialState,
);

const persistConfig = {
  key: 'news',
  storage: AsyncStorage,
};

export default persistReducer(persistConfig, newsReducer);
