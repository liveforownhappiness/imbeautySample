import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  rootReducer,
  __DEV__
    ? composeWithDevTools(applyMiddleware(sagaMiddleware, logger)) // logger가 제일 마지막에 와야 함
    : applyMiddleware(sagaMiddleware),
);

export const persistor = persistStore(store);
// persistor.purge(); // 주석을 풀면 시작시에 persist 데이터 리셋

sagaMiddleware.run(rootSaga);

export default { store, persistor };
