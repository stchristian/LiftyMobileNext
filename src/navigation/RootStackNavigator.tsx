import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import StackNavigator, {HomeStackParamList} from './HomeStackNavigator';
import LocationFinder, {
  LocationFinderParams as LocationFinderParams,
} from '../screens/LocationFinder';
import {NavigatorScreenParams} from '@react-navigation/core';
import TabNavigator, {TabParamList} from './TabNavigator';
import SplashScreen from '../screens/Splash';
import {useAuthListener} from 'hooks/auth';
import {useAppSelector} from 'hooks/store';
export type RootStackParamList = {
  Splash: {};
  HomeStack: NavigatorScreenParams<HomeStackParamList>;
  LocationFinder: LocationFinderParams;
  Tab: NavigatorScreenParams<TabParamList>;
};

export type RootStackNavigationProps = StackNavigationProp<RootStackParamList>;

const RootStack = createStackNavigator<RootStackParamList>();

export default React.memo(() => {
  const rootState = useAppSelector(state => state);
  // console.log('APP ROOT STATE', JSON.stringify(rootState, null, 2));

  return (
    <RootStack.Navigator initialRouteName="Splash" mode="modal">
      <RootStack.Screen
        name="Splash"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="HomeStack"
        component={StackNavigator}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="LocationFinder"
        component={LocationFinder}
        options={{headerShown: false}}
      />
    </RootStack.Navigator>
  );
});
