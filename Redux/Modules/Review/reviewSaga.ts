import { all, takeLatest } from 'redux-saga/effects';
import reviewApi from '../../../Service/Review/ReviewService';
import { createAsyncSaga } from '../../../Util/reducer.util';
import { reviewActionCreator, reviewActions } from './reviewReducer';

const refreshReviewsSaga = createAsyncSaga(
  reviewActionCreator.refreshReviews,
  reviewApi.getReviews,
);
const fetchReviewsSaga = createAsyncSaga(reviewActionCreator.fetchReviews, reviewApi.getReviews);
const refreshScrapsSaga = createAsyncSaga(reviewActionCreator.refreshScraps, reviewApi.getScraps);
const fetchScrapsSaga = createAsyncSaga(reviewActionCreator.fetchScraps, reviewApi.getScraps);

export default function* reviewSaga() {
  yield all([takeLatest<any, any>(reviewActions.REFRESH_REVIEWS, refreshReviewsSaga)]);
  yield all([takeLatest<any, any>(reviewActions.FETCH_REVIEWS, fetchReviewsSaga)]);
  yield all([takeLatest<any, any>(reviewActions.REFRESH_SCRAPS, refreshScrapsSaga)]);
  yield all([takeLatest<any, any>(reviewActions.FETCH_SCRAPS, fetchScrapsSaga)]);
}
