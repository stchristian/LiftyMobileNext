import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {AddRouteParams, AddRouteScreen} from 'screens/AddRoute';
import AddRideScreen, {AddRideParams} from 'screens/AddRide';
import RideMatches, {RideMatchesParams} from 'screens/RideMatches';
import PersonalDetailsScreen from 'screens/PersonalDetails';

export type HomeStackParamList = {
  AddRoute: AddRouteParams;
  AddRide: AddRideParams;
  RideMatches: RideMatchesParams;
  PersonalDetails: {};
};

export type HomeStackNavigationProp = StackNavigationProp<HomeStackParamList>;

const HomeStackNavigator = createStackNavigator<HomeStackParamList>();

export default React.memo(() => {
  return (
    <HomeStackNavigator.Navigator initialRouteName="AddRoute">
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
    </HomeStackNavigator.Navigator>
  );
});
