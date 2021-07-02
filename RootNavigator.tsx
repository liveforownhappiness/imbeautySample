import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import RootStackNavigator from './RootStackNavigator';

// React Navigation v5 API 변경으로 인해, 네비게이션의 마운트만을 따로 담당하는 컴포넌트

function RootNavigator() {
  return (
    <NavigationContainer>
      <RootStackNavigator />
    </NavigationContainer>
  );
}

export default RootNavigator;
