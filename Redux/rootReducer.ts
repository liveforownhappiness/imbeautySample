import AsyncStorage from '@react-native-community/async-storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import event from './Modules/Event/eventReducer';
import home from './Modules/Home/homeReducer';
import news from './Modules/News/newsReducer';
import review from './Modules/Review/reviewReducer';
import setting from './Modules/Setting/settingReducer';
import shop from './Modules/Shop/shopReducer';
import user from './Modules/User/userReducer';

const rootReducer = combineReducers({
  review,
  shop,
  user,
  setting,
  event,
  home,
  news,
});

// 루트 리듀서의 반환값(타입) 유추
export type RootState = ReturnType<typeof rootReducer>;

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['review', 'shop', 'user', 'setting', 'event', 'home', 'news'],
};

export default persistReducer(rootPersistConfig, rootReducer);
