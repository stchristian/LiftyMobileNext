import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Community from 'screens/Community';
import MyRides from 'screens/MyRides';
import Profile from 'screens/Profile';
import BottomTabBar from 'shared/BottomTabBar';
import {useLoggedInUser} from 'hooks/auth';
export type TabParamList = {
  Community: {};
  MyRides: {};
  Profile: {};
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigator() {
  const user = useLoggedInUser();

  if (!user) return null;

  return (
    <Tab.Navigator
      initialRouteName="Profile"
      tabBar={props => <BottomTabBar {...props} />}>
      <Tab.Screen
        name="Community"
        component={Community}
        //@ts-ignore
        options={{title: 'közösségek', icon: 'user-friends'}}
      />
      <Tab.Screen
        name="MyRides"
        component={MyRides}
        //@ts-ignore
        options={{title: 'utazásaim', icon: 'calendar'}}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        //@ts-ignore
        options={{title: 'profil', icon: 'user'}}
      />
    </Tab.Navigator>
  );
}
