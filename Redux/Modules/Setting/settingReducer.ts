import { createAction, handleActions } from 'redux-actions';
import { PURGE } from 'redux-persist';
import { setValueReducer } from '../../../Util/reducer.util';

// 스토어 배포 빌드일때는 'Production'으로, QA빌드일때는 'Development'로 변경해주세요.
export const API_MODE_TYPES = {
  PRODUCTION: 'Production',
  DEVELOPMENT: 'Development',
  STAGING: 'Staging',
  LOCAL: 'Local',
};

export const settingInitialState = {
  apiMode: API_MODE_TYPES.PRODUCTION,
  isAppFirstStart: true,
  notice_modal: { open: true, date: null },
  tags: [],
  locations: [],
  deep_link: {},
  recent_locations: [],
};

export const settingActions = {
  SET_VALUE: '@setting/SET_VALUE',
};

export const settingActionCreator = {
  setValue: createAction(settingActions.SET_VALUE),
};

export const settingReducer = handleActions(
  {
    [settingActions.SET_VALUE]: setValueReducer,
    [PURGE]: () => settingInitialState,
  },
  settingInitialState,
);

export default settingReducer;
