import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';
import AsyncStorage from '@react-native-community/async-storage';

// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
//   whitelist: ["reviewReducer"]
//   //whitelist: ~~만 포함
//   //blacklist: ~~만 제외
// };

// const enhancedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  __DEV__ ?
    composeWithDevTools(applyMiddleware(sagaMiddleware, logger)) :  // logger가 제일 마지막에 와야 함
    applyMiddleware(sagaMiddleware)
  );

sagaMiddleware.run(rootSaga);

export default store;
