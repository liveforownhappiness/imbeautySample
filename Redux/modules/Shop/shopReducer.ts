import { createAction, handleActions } from 'redux-actions';

import { getAsyncState, createAsyncActions, handleAsyncActions } from '../../../Util/reducer.util';
import { concatData } from '../../../Util/dataFormatter';

const initialState = {
  shops: getAsyncState.initial([]),
};

export const shopActions = {
  
  FETCH_SHOP: 'shop/FETCH_SHOP',
  FETCH_SHOPS: 'shop/FETCH_SHOPS',
};

export const shopActionCreator = {

  fetchShop: createAsyncActions(shopActions, 'FETCH_SHOP' ),
  fetchShops: createAsyncActions(shopActions, 'FETCH_SHOPS'),

};

const shopReducer = handleActions(
  {
    ...handleAsyncActions(
      shopActions.FETCH_SHOP,
      'shops',
      concatData
      ),
    ...handleAsyncActions(
      shopActions.FETCH_SHOPS,
      'shops',
      concatData
      )
  },
  initialState
)

export default shopReducer;
