import { all, takeLatest, call, put, select } from 'redux-saga/effects';

import { createAsyncSaga } from '../../../Util/reducer.util';
import { shopActionCreator, shopActions } from './shopReducer';
import shopApi from '../../../Service/Shop/shopService';



const fetchShopsSaga = createAsyncSaga(shopActionCreator.fetchShop, shopApi.getShop);
 
export default function* shopSaga() {
  yield all([
    takeLatest<any, any>(shopActions.FETCH_SHOP, fetchShopsSaga),
  ]);
}
