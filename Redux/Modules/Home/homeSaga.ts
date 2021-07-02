import { all, takeLatest, call, put, select } from 'redux-saga/effects';

import homeApi from '../../../Service/Home/HomeService';
import { homeActions, homeActionCreator } from './homeReducer';
import { createAsyncSaga } from '../../../Util/reducer.util';

const fetchHomesSaga = createAsyncSaga(homeActionCreator.fetchHomes, homeApi.getHomes);

export default function* homeSaga() {
  yield all([takeLatest<any, any>(homeActions.FETCH_HOMES, fetchHomesSaga)]);
}
