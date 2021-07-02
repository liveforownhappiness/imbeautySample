import { all, takeLatest, call, put, select } from 'redux-saga/effects';

import reviewApi from '../../../Service/Review/ReviewService';
import { reviewActions, reviewActionCreator } from './reviewReducer';
import { createAsyncSaga } from '../../../Util/reducer.util';

const fetchReviewsSaga = createAsyncSaga(reviewActionCreator.fetchReviews, reviewApi.getReviews);
 
export default function* reviewSaga() {
  yield all([
    takeLatest<any, any>(reviewActions.FETCH_REVIEWS, fetchReviewsSaga),
  ]);
}
