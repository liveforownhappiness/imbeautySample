import { createAction, handleActions } from 'redux-actions';
import { PURGE } from "redux-persist";
import dataFormatter from '../../../Util/dataFormatter';
import {
  createAsyncActions,
  getAsyncState,
  handleAsyncActions,
  setValueReducer
} from '../../../Util/reducer.util';

export const eventInitialState = {
  events: getAsyncState.initial({ next: '', previous: '', results: [] }),
  scraps: getAsyncState.initial({ next: '', previous: '', results: [] }),
  main_image: null,
  origin_price: null,
  discounted_price: null,
  title: '',
  content: '',
  images: [],
  tags: {},
  exposure_start: null,
  exposure_end: null,
};

export const eventActions = {
  SET_VALUE: '@event/SET_VALUE',
  REFRESH_EVENTS: '@event/REFRESH_EVENTS',
  FETCH_EVENTS: '@event/FETCH_EVENTS',
  REFRESH_SCRAPS: '@event/REFRESH_SCRAPS',
  FETCH_SCRAPS: '@event/FETCH_SCRAPS',
};

export const eventActionCreator = {
  setValue: createAction(eventActions.SET_VALUE),
  refreshEvents: createAsyncActions(eventActions, 'REFRESH_EVENTS'),
  fetchEvents: createAsyncActions(eventActions, 'FETCH_EVENTS'),
  refreshScraps: createAsyncActions(eventActions, 'REFRESH_SCRAPS'),
  fetchScraps: createAsyncActions(eventActions, 'FETCH_SCRAPS'),
};

const eventReducer = handleActions(
  {
    [eventActions.SET_VALUE]: setValueReducer,
    ...handleAsyncActions(eventActions.REFRESH_EVENTS, 'events'),
    ...handleAsyncActions(eventActions.FETCH_EVENTS, 'events', dataFormatter.formatfeeds),
    ...handleAsyncActions(eventActions.REFRESH_SCRAPS, 'scraps'),
    ...handleAsyncActions(eventActions.FETCH_SCRAPS, 'scraps', dataFormatter.formatfeeds),
    [PURGE]: () => eventInitialState,
  },
  eventInitialState,
);

export default eventReducer;
