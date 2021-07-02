import { all, takeLatest } from 'redux-saga/effects';
import newsApi from '../../../Service/News/NewsService';
import { createAsyncSaga } from '../../../Util/reducer.util';
import { newsActionCreator, newsActions } from './newsReducer';

const refreshNewssSaga = createAsyncSaga(
  newsActionCreator.refreshNewss,
  newsApi.getNewss,
);
const fetchNewssSaga = createAsyncSaga(newsActionCreator.fetchNewss, newsApi.getNewss);
const refreshScrapsSaga = createAsyncSaga(newsActionCreator.refreshScraps, newsApi.getScraps);
const fetchScrapsSaga = createAsyncSaga(newsActionCreator.fetchScraps, newsApi.getScraps);

export default function* newsSaga() {
  yield all([takeLatest<any, any>(newsActions.REFRESH_REVIEWS, refreshNewssSaga)]);
  yield all([takeLatest<any, any>(newsActions.FETCH_REVIEWS, fetchNewssSaga)]);
  yield all([takeLatest<any, any>(newsActions.REFRESH_SCRAPS, refreshScrapsSaga)]);
  yield all([takeLatest<any, any>(newsActions.FETCH_SCRAPS, fetchScrapsSaga)]);
}
