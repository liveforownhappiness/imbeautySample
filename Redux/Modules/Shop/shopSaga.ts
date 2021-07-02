import { all, takeLatest } from 'redux-saga/effects';
import shopApi from '../../../Service/Shop/shopService';
import { createAsyncSaga } from '../../../Util/reducer.util';
import { shopActionCreator, shopActions } from './shopReducer';

const refreshShopsSaga = createAsyncSaga(shopActionCreator.refreshShops, shopApi.getShops);
const fetchShopsSaga = createAsyncSaga(shopActionCreator.fetchShops, shopApi.getShops);
const refreshScrapsSaga = createAsyncSaga(shopActionCreator.refreshScraps, shopApi.getScraps);
const fetchScrapsSaga = createAsyncSaga(shopActionCreator.fetchScraps, shopApi.getScraps);

export default function* shopSaga() {
  yield all([takeLatest<any, any>(shopActions.REFRESH_SHOPS, refreshShopsSaga)]);
  yield all([takeLatest<any, any>(shopActions.FETCH_SHOPS, fetchShopsSaga)]);
  yield all([takeLatest<any, any>(shopActions.REFRESH_SCRAPS, refreshScrapsSaga)]);
  yield all([takeLatest<any, any>(shopActions.FETCH_SCRAPS, fetchScrapsSaga)]);
}
