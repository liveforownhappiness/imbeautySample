import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../Screen/HomeScreen';
import EventScreen from '../Screen/EventScreen';
import ReviewStackScreen from './Review/ReviewStackScreen';
import ShopScreen from '../Screen/ShopScreen';
import ScrapScreen from '../Screen/ScrapScreen';
import ColorList from '../Assets/js/ColorList';
import ScrapStackScreen from './Scrap/ScrapStackScreen';
import ShopStackScreen from './Shop/ShopStackScreen';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { shopActionCreator } from '../Redux/modules/Shop/shopReducer';

const Tab = createBottomTabNavigator();

// const dispatch = useDispatch();
    
//   const onfetchShops = () => {
//         dispatch(shopActionCreator.fetchShops.request());
//     };
//   const shop_list = useSelector(state => (state.shopReducer), shallowEqual);

// useEffect(() => {
//   onfetchShops();
// }, []);


const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="ReviewStack"
      tabBarOptions={{
        activeTintColor: ColorList.primary,
      }}>
      <Tab.Screen
        name="Home" 
        component={HomeScreen}
        options={{
          unmountOnBlur:true,
          // tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Event"
        component={EventScreen}
        options={{
          unmountOnBlur:true,
          // tabBarLabel: 'Event',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="gift-outline"
              color={color}
              size={size}
            />
          ),
          // tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="ReviewStack"
        component={ReviewStackScreen}
        options={{
          unmountOnBlur:true,
          title:'Review',
          // tabBarLabel: 'Review',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="message-text-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      {/* <Tab.Screen name={`ShopStack`} options={{
          unmountOnBlur:true,
          title:'Shop',
          // tabBarLabel: 'Shop',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="storefront-outline"
              color={color}
              size={size}
            />
          ),
        }}
      children={({navigation})=><ShopStackScreen shop_list={shop_list}/>
      }/> */}
      <Tab.Screen
        name="ShopStack"
        component={ShopStackScreen}
        options={{
          unmountOnBlur:true,
          title:'Shop',
          // tabBarLabel: 'Shop',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="storefront-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ScrapStack"
        component={ScrapStackScreen}
        options={{
          // tab눌렀을 
          title:'Scrap',
          unmountOnBlur:true,
          // tabBarLabel: 'Scrap',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="heart-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
