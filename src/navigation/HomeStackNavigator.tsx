import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {AddRouteParams, AddRouteScreen} from 'screens/AddRoute';
import AddRideScreen, {AddRideParams} from 'screens/AddRide';
import RideMatches, {RideMatchesParams} from 'screens/RideMatches';
import PersonalDetailsScreen from 'screens/PersonalDetails';
import LoginScreen from 'screens/Login';
import {useAuthListener} from 'hooks/auth';
import TabNavigator from './TabNavigator';
import {useAppSelector} from 'hooks/store';
import DemoMatches from 'screens/DemoMatches';

export type HomeStackParamList = {
  AddRoute: AddRouteParams;
  AddRide: AddRideParams;
  RideMatches: RideMatchesParams;
  PersonalDetails: {};
  Login: {};
  Tab: {};
  DemoMatches: {
    routeId: string;
  };
};

export type HomeStackNavigationProp = StackNavigationProp<HomeStackParamList>;

const HomeStackNavigator = createStackNavigator<HomeStackParamList>();

export default React.memo(() => {
  useAuthListener();
  const signedIn = useAppSelector(state => !!state.user);
  return (
    <HomeStackNavigator.Navigator>
      {false ? (
        <>
          <HomeStackNavigator.Screen
            name="Tab"
            component={TabNavigator}
            options={{headerShown: false}}
          />
          <HomeStackNavigator.Screen
            name="AddRoute"
            component={AddRouteScreen}
            initialParams={{}}
            options={{
              headerShown: false,
            }}
          />
          <HomeStackNavigator.Screen
            name="AddRide"
            component={AddRideScreen}
            initialParams={{}}
            options={{headerShown: false}}
          />
          <HomeStackNavigator.Screen
            name="RideMatches"
            component={RideMatches}
            initialParams={{}}
            options={{headerShown: false}}
          />
          <HomeStackNavigator.Screen
            name="PersonalDetails"
            component={PersonalDetailsScreen}
            options={{headerShown: false}}
          />
          <HomeStackNavigator.Screen
            name="DemoMatches"
            component={DemoMatches}
            options={{headerShown: false}}
          />
        </>
      ) : (
        <HomeStackNavigator.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
      )}
    </HomeStackNavigator.Navigator>
  );
});
