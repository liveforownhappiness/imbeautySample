import { all, takeLatest } from 'redux-saga/effects';
import eventApi from '../../../Service/Event/EventService';
import { createAsyncSaga } from '../../../Util/reducer.util';
import { eventActionCreator, eventActions } from './eventReducer';

const refreshEventsSaga = createAsyncSaga(eventActionCreator.refreshEvents, eventApi.getEvents);
const fetchEventsSaga = createAsyncSaga(eventActionCreator.fetchEvents, eventApi.getEvents);
const refreshScrapsSaga = createAsyncSaga(eventActionCreator.refreshScraps, eventApi.getScraps);
const fetchScrapsSaga = createAsyncSaga(eventActionCreator.fetchScraps, eventApi.getScraps);

export default function* eventSaga() {
  yield all([takeLatest<any, any>(eventActions.REFRESH_EVENTS, refreshEventsSaga)]);
  yield all([takeLatest<any, any>(eventActions.FETCH_EVENTS, fetchEventsSaga)]);
  yield all([takeLatest<any, any>(eventActions.REFRESH_SCRAPS, refreshScrapsSaga)]);
  yield all([takeLatest<any, any>(eventActions.FETCH_SCRAPS, fetchScrapsSaga)]);
}
