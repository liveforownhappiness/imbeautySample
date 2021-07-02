import { all, fork } from 'redux-saga/effects';

import reviewSaga from './modules/Review/reviewSaga';
import shopSaga from './modules/Shop/shopSaga';
import userSaga from './modules/User/userSaga';

export default function* rootSaga() {
  yield all([
    fork(reviewSaga),fork(shopSaga),fork(userSaga)
  ]);
}
