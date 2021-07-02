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

export const reviewInitialState = {
  reviews: getAsyncState.initial({ next: '', previous: '', results: [] }),
  images: [],
  shop: null,
  content: '',
  tags: {},
  rating: 5,
  price: undefined,
  treatment_date: undefined,
  scraps: getAsyncState.initial({ next: '', previous: '', results: [] }),
};

export const reviewActions = {
  SET_VALUE: '@review/SET_VALUE',
  REFRESH_REVIEWS: '@review/REFRESH_REVIEWS',
  FETCH_REVIEWS: '@review/FETCH_REVIEWS',
  REFRESH_SCRAPS: '@review/REFRESH_SCRAPS',
  FETCH_SCRAPS: '@review/FETCH_SCRAPS',
};

export const reviewActionCreator = {
  setValue: createAction(reviewActions.SET_VALUE),
  fetchReviews: createAsyncActions(reviewActions, 'REFRESH_REVIEWS'),
  refreshReviews: createAsyncActions(reviewActions, 'FETCH_REVIEWS'),
  refreshScraps: createAsyncActions(reviewActions, 'REFRESH_SCRAPS'),
  fetchScraps: createAsyncActions(reviewActions, 'FETCH_SCRAPS'),
};

const reviewReducer = handleActions(
  {
    [reviewActions.SET_VALUE]: setValueReducer,
    ...handleAsyncActions(reviewActions.REFRESH_REVIEWS, 'reviews'),
    ...handleAsyncActions(reviewActions.FETCH_REVIEWS, 'reviews', dataFormatter.formatfeeds),
    ...handleAsyncActions(reviewActions.REFRESH_SCRAPS, 'scraps'),
    ...handleAsyncActions(reviewActions.FETCH_SCRAPS, 'scraps', dataFormatter.formatfeeds),
    [PURGE]: () => reviewInitialState,
  },
  reviewInitialState,
);

const persistConfig = {
  key: 'review',
  storage: AsyncStorage,
};

export default persistReducer(persistConfig, reviewReducer);
