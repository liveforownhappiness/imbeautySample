/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';

import store from './src/Redux/store';
import RootNavigator from './src/Navigator/RootNavigator';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';



if (__DEV__) {
  import('./ReactotronConfig').then(() => {
    return console.log('Reactotron Configured...');
  });
}
declare const global: { HermesInternal: null | {} };

// const persistor = persistStore(store); 

const App = () => {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}>  */}
      <RootNavigator />
      {/* </PersistGate> */}
    </Provider>
  );
};

export default App;
