import { all, fork } from 'redux-saga/effects';
import eventSaga from './Modules/Event/eventSaga';
import homeSaga from './Modules/Home/homeSaga';
import newsSaga from './Modules/News/newsSaga';
import reviewSaga from './Modules/Review/reviewSaga';
import shopSaga from './Modules/Shop/shopSaga';
import userSaga from './Modules/User/userSaga';


export default function* rootSaga() {
  yield all([
    fork(reviewSaga),
    fork(shopSaga),
    fork(userSaga),
    fork(eventSaga),
    fork(homeSaga),
    fork(newsSaga),
  ]);
}
