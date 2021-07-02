import { createAction, handleActions } from 'redux-actions';

import { getAsyncState, createAsyncActions, handleAsyncActions } from '../../../Util/reducer.util';
import { concatData } from '../../../Util/dataFormatter';

const initialState = {
  reviews: getAsyncState.initial([]),
};

export const reviewActions = {
  FETCH_REVIEWS: 'review/FETCH_REVIEWS',
};

export const reviewActionCreator = {
  fetchReviews: createAsyncActions(reviewActions, 'FETCH_REVIEWS'),
};

const reviewReducer = handleActions(
  {
    ...handleAsyncActions(
      reviewActions.FETCH_REVIEWS,
      'reviews',
      concatData
      )
  },
  initialState
)

export default reviewReducer;
