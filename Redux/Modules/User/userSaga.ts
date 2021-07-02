import { all, takeLatest, call, put, select } from 'redux-saga/effects';

import { createAsyncSaga } from '../../../Util/reducer.util';
import { userActionCreator, userActions } from './userReducer';
import userApi from '../../../Service/User/UserService';

const fetchUserSaga = createAsyncSaga(userActionCreator.fetchUser, userApi.getUser);

export default function* userSaga() {
  yield all([takeLatest<any, any>(userActions.FETCH_USER, fetchUserSaga)]);
}
