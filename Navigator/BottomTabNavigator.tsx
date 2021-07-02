import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ColorList from '../Assets/js/ColorList';
import EventScreen from '../Screen/EventScreen';
import HomeScreen from '../Screen/HomeScreen';
import NewsScreen from '../Screen/NewsScreen';
import ReviewScreen from '../Screen/ReviewScreen';
import ShopScreen from '../Screen/ShopScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      tabBarOptions={{
        activeTintColor: ColorList.primary,
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: '홈',
          unmountOnBlur: true,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="EventScreen"
        component={EventScreen}
        options={{
          unmountOnBlur: true,
          title: '이벤트',
          // tabBarLabel: 'Event',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="gift-outline" color={color} size={size} />
          ),
          // tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="NewsScreen"
        component={NewsScreen}
        options={{
          title: '샵소식',
          unmountOnBlur: true,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="newspaper-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ReviewScreen"
        component={ReviewScreen}
        options={{
          unmountOnBlur: true,
          title: '후기',
          // tabBarLabel: 'Review',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="message-text-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ShopScreen"
        component={ShopScreen}
        options={{
          unmountOnBlur: true,
          title: '샵',
          // tabBarLabel: 'Shop',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="storefront-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
