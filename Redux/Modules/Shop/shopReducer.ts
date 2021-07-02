import { createAction, handleActions } from 'redux-actions';
import { PURGE } from 'redux-persist';
import dataFormatter from '../../../Util/dataFormatter';
import {
  createAsyncActions,
  getAsyncState,
  handleAsyncActions,
  setValueReducer
} from '../../../Util/reducer.util';

export const shopInitialState = {
  shops: getAsyncState.initial({ next: '', previous: '', results: [] }),
  scraps: getAsyncState.initial({ next: '', previous: '', results: [] }),
  name: '',
  logo_img_url: null,
  introduce: '',
  location: [],
  tags: {},
  location_detail: '',
  apply_guide: '원하는시술: \n시술경험: ',
  kakaotalk_link: null,
  instagram_link: null,
};

export const shopActions = {
  SET_VALUE: '@shop/SET_VALUE',
  REFRESH_SHOPS: '@shop/REFRESH_SHOPS',
  FETCH_SHOPS: '@shop/FETCH_SHOPS',
  REFRESH_SCRAPS: '@shop/REFRESH_SCRAPS',
  FETCH_SCRAPS: '@shop/FETCH_SCRAPS',
};

export const shopActionCreator = {
  setValue: createAction(shopActions.SET_VALUE),
  refreshShops: createAsyncActions(shopActions, 'REFRESH_SHOPS'),
  fetchShops: createAsyncActions(shopActions, 'FETCH_SHOPS'),
  refreshScraps: createAsyncActions(shopActions, 'REFRESH_SCRAPS'),
  fetchScraps: createAsyncActions(shopActions, 'FETCH_SCRAPS'),
};

const shopReducer = handleActions(
  {
    [shopActions.SET_VALUE]: setValueReducer,
    ...handleAsyncActions(shopActions.REFRESH_SHOPS, 'shops'),
    ...handleAsyncActions(shopActions.FETCH_SHOPS, 'shops', dataFormatter.formatfeeds),
    ...handleAsyncActions(shopActions.REFRESH_SCRAPS, 'scraps'),
    ...handleAsyncActions(shopActions.FETCH_SCRAPS, 'scraps', dataFormatter.formatfeeds),
    [PURGE]: () => shopInitialState,
  },
  shopInitialState,
);

export default shopReducer;
